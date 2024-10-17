import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ReactiveValidationModule } from 'angular-reactive-validation';

import { PrimeNGModule } from '@app/prime-ng/prime-ng.module';
import { PatientFacade } from '@app/patient/helpers/patient.facade';
import {
  Patient,
  PatientCreationParams,
  PatientRegistrationParams,
  PatientUpdateParams,
} from '@app/patient/interfaces/patient.interface';
import { TemplateFormComponent } from '@app/core/components/template-form.component';
import { PatientFormStrategy } from '@app/patient/strategies/patient-form.strategy';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveValidationModule, PrimeNGModule],
  templateUrl: './patient-form.component.html',
})
export class PatientFormComponent extends TemplateFormComponent<
  Patient,
  PatientRegistrationParams,
  PatientUpdateParams
> {
  protected override entityFacade = inject(PatientFacade);
  protected override formStrategy = inject(PatientFormStrategy);

  genderItems = this.formStrategy.genderItems;
  bloodTypeItems = this.formStrategy.bloodTypes;
}
