import { Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplateFormComponent } from '@app/core/components/template-form.component';
import { PatientDataService } from '@app/patient/services/patient-data.service';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { VisitFacade } from '@app/visit/helpers/visit.facade';
import {
  Visit,
  VisitCreationParams,
  VisitUpdateParams,
} from '@app/visit/interfaces/visit.interface';
import { VisitFormStrategy } from '@app/visit/strategies/visit-form.strategy';
import { ReactiveValidationModule } from 'angular-reactive-validation';

@Component({
  selector: 'app-visit-form',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveValidationModule, PrimeNGModule],
  templateUrl: './visit-form.component.html',
})
export class VisitFormComponent
  extends TemplateFormComponent<Visit, VisitCreationParams, VisitUpdateParams>
  implements OnInit
{
  protected override entityFacade = inject(VisitFacade);
  protected override formStrategy = inject(VisitFormStrategy);
  private patientDataService = inject(PatientDataService);

  isEmergency = false;
  visitTypeItems = this.formStrategy.visitType;
  priorityLevelItems = this.formStrategy.priorityLevel;
  doctorsItems = this.formStrategy.doctors;

  override ngOnInit() {
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.isEmergency = params['isEmergency'] === 'true';
        this.initForm();
      });
    this.formStrategy.populateDoctors();
  }

  protected override initForm(): void {
    this.entityForm = this.formStrategy.createForm(this.isEmergency);
  }

  protected override createEntity(entityData: VisitCreationParams): void {
    const medicalRecordId =
      this.patientDataService.currentPatient()?.medicalRecordId;
    if (!medicalRecordId) {
      console.error('Medical record ID is not provided');
      return;
    }
    const body = {
      ...entityData,
      medicalRecordId: medicalRecordId,
    };

    this.entityFacade
      .createEntity(body)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.patientDataService.clearCurrentPatient();
          const patientId =
            this.route.parent?.snapshot.paramMap.get('patientId');
          if (patientId) {
            this.router.navigate(['/patient', patientId, 'overview']);
          } else {
            console.error('Patient ID is not provided');
          }
        },
      });
  }

  protected override updateEntity(entityData: VisitUpdateParams): void {
    if (this.entityId) {
      this.entityFacade
        .updateEntity(this.entityId, entityData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe();
    }
  }
}
