import { Component } from '@angular/core';
import { DoctorFormComponent } from '@app/doctor/components/doctor-form/doctor-form.component';

@Component({
  selector: 'app-create-doctor',
  standalone: true,
  imports: [DoctorFormComponent],
  templateUrl: './create-doctor-page.component.html',
})
export class CreateDoctorPageComponent {}
