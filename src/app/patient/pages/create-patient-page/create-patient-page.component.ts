import { Component } from '@angular/core';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';

@Component({
  selector: 'app-create-patient-page',
  standalone: true,
  imports: [PatientFormComponent],
  templateUrl: './create-patient-page.component.html',
})
export class CreatePatientPageComponent {}
