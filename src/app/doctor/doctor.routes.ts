import { Routes } from '@angular/router';

export const DoctorRoutes: Routes = [
  // {
  //   path: '',
  //   component: PatientLayoutComponent,
  //   children: [
  //     { path: '', redirectTo: 'list', pathMatch: 'full' },
  //     { path: 'list', component: PatientListComponent },
  //     { path: 'new', component: CreatePatientPageComponent },
  //     { path: 'edit/:id', component: EditPatientPageComponent },
  //   ],
  // },
  { path: '**', redirectTo: '/notfound' },
];
