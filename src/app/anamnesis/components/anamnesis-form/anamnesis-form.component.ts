import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AnamnesisFacade } from '@app/anamnesis/helpers/anamesis.facade';
import {
  Anamnesis,
  AnamnesisRegistrationParams,
  AnamnesisUpdateRequestParams,
} from '@app/anamnesis/interfaces/anamnese.interface';
import { AnamnesisFormStrategy } from '@app/anamnesis/strategies/anamnesis-form.strategy';
import { TemplateFormComponent } from '@app/core/components/template-form.component';
import { PatientDataService } from '@app/patient/services/patient-data.service';
import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { ReactiveValidationModule } from 'angular-reactive-validation';

@Component({
  selector: 'app-anamnesis-form',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveValidationModule, PrimeNGModule],
  templateUrl: './anamnesis-form.component.html',
})
export class AnamnesisFormComponent extends TemplateFormComponent<
  Anamnesis,
  AnamnesisRegistrationParams,
  AnamnesisUpdateRequestParams
> {
  protected override entityFacade = inject(AnamnesisFacade);
  protected override formStrategy = inject(AnamnesisFormStrategy);
  private patientDataService = inject(PatientDataService);

  maritalStatusItems = this.formStrategy.maritalStatusItems;

  protected override createEntity(
    entityData: AnamnesisRegistrationParams,
  ): void {
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
    this.entityFacade.createEntity(body).subscribe({
      next: () => {
        this.patientDataService.clearCurrentPatient();
        const patientId = this.route.snapshot.paramMap.get('patientId');
        this.router.navigate(['/patient', patientId, 'overview']);
      },
    });
  }
}
