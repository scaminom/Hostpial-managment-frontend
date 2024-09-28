import { Routes } from '@angular/router';
import { PatientFormComponent } from './component/patient-form/patient-form.component';
import { PatientLayoutComponent } from './component/patient-layout/patient-layout.component';
import { PatientTableComponent } from './component/patient-table/patient-table.component';

export const PatientRoutes: Routes = [
  {
    path: '',
    component: PatientLayoutComponent,
    children: [
      { path: 'list', component: PatientTableComponent },
      { path: 'new', component: PatientFormComponent },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
];
