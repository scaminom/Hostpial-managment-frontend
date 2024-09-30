import { Routes } from '@angular/router';
import { PatientLayoutComponent } from './layout/patient-layout/patient-layout.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { CreatePatientPageComponent } from './pages/create-patient-page/create-patient-page.component';
import { EditPatientPageComponent } from './pages/edit-patient-page/edit-patient-page.component';

export const PatientRoutes: Routes = [
  {
    path: '',
    component: PatientLayoutComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: PatientListComponent },
      { path: 'new', component: CreatePatientPageComponent },
      { path: 'edit/:id', component: EditPatientPageComponent },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
];
