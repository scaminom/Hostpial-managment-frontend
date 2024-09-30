import { Routes } from '@angular/router';
import { DoctorLayoutComponent } from './layout/doctor-layout/doctor-layout.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';

export const DoctorRoutes: Routes = [
  {
    path: '',
    component: DoctorLayoutComponent,
    children: [
      // { path: '', redirectTo: 'list', pathMatch: 'full' },
      // { path: 'list', component: PatientListComponent },
      { path: 'new', component: DoctorFormComponent },
      // { path: 'edit/:id', component: EditPatientPageComponent },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
];
