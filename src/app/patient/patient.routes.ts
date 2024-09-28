import { Routes } from '@angular/router';
import { PatientFormComponent } from './component/patient-form/patient-form.component';

export const PatientRoutes: Routes = [
  { path: '', component: PatientFormComponent },
  { path: '**', redirectTo: '/notfound' },
];
