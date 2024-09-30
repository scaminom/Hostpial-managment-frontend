import { Component } from '@angular/core';
import { PatientFormComponent } from '../../components/patient-form/patient-form.component';

@Component({
  selector: 'app-edit-patient-page',
  standalone: true,
  imports: [PatientFormComponent],
  templateUrl: './edit-patient-page.component.html',
})
export class EditPatientPageComponent {}
