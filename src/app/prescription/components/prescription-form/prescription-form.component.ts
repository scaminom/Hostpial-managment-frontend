import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateFormComponent } from '@app/core/components/template-form.component';
import { PrescriptionFacade } from '@app/prescription/helpers/prescription.facade';
import {
  Prescription,
  PrescriptionRegistrationParams,
  PrescriptionUpdateRequestParams,
} from '@app/prescription/interfaces/prescription.interface';
import { PrescriptionFormStrategy } from '@app/prescription/strategies/prescription-form.strategy';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { ReactiveValidationModule } from 'angular-reactive-validation';

@Component({
  selector: 'app-prescription-form',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveValidationModule, PrimeNGModule],
  templateUrl: './prescription-form.component.html',
})
export class PrescriptionFormComponent extends TemplateFormComponent<
  Prescription,
  PrescriptionRegistrationParams,
  PrescriptionUpdateRequestParams
> {
  protected override entityFacade = inject(PrescriptionFacade);
  protected override formStrategy = inject(PrescriptionFormStrategy);

  protected override createEntity(
    entityData: PrescriptionRegistrationParams,
  ): void {
    const visitId = this.route.snapshot.paramMap.get('visitId');

    const data = {
      ...entityData,
      visitId: visitId,
    };

    this.entityFacade
      .createEntity(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.navigateBack());
  }

  protected override updateEntity(
    entityData: PrescriptionUpdateRequestParams,
  ): void {
    if (this.entityId) {
      this.entityFacade
        .updateEntity(this.entityId, entityData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.navigateBack());
    }
  }

  protected override checkEditMode(): void {
    this.isEditMode = this.router.url.includes('edit');
    if (this.isEditMode) {
      const prescriptionId = this.route.snapshot.paramMap.get('prescriptionId');
      if (prescriptionId) {
        this.entityId = +prescriptionId;
        this.retrieveEntity(+prescriptionId);
      } else {
        console.error('Prescription ID not found in the current route');
      }
    }
  }

  private navigateBack(): void {
    const patientId = this.route.parent?.snapshot.paramMap.get('patientId');
    const visitId = this.route.snapshot.paramMap.get('visitId');
    if (patientId && visitId) {
      this.router.navigate(['/patient', patientId, 'visit', visitId], {
        queryParams: { activeTab: 'prescriptions' },
        queryParamsHandling: 'merge',
      });
    } else {
      console.error('Patient ID or Visit ID not found in the current route');
    }
  }
}
