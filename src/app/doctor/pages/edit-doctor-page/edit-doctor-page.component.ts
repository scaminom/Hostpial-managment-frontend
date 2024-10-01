import { Component } from '@angular/core';
import { DoctorFormComponent } from '@app/doctor/components/doctor-form/doctor-form.component';

@Component({
  selector: 'app-edit-doctor',
  standalone: true,
  imports: [DoctorFormComponent],
  templateUrl: './edit-doctor-page.component.html',
})
export class EditDoctorPageComponent {}
