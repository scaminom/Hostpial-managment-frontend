import { Routes } from '@angular/router';
import { PatientLayoutComponent } from './layouts/patient-layout/patient-layout.component';
import { EditPatientPageComponent } from './pages/edit-patient-page/edit-patient-page.component';
import { ListPatientPageComponent } from './pages/list-patient-page/list-patient-page.component';
import { CreatePatientPageComponent } from './pages/create-patient-page/create-patient-page.component';
import { PatientOverviewPageComponent } from './pages/patient-overview-page/patient-overview-page.component';
import { VisitDetailsPageComponent } from '@app/visit/pages/visit-details-page/visit-details-page.component';
import { CreateVisitPageComponent } from '@app/visit/pages/create-visit-page/create-visit-page.component';
import { PatientOverviewLayoutComponent } from './layouts/patient-overview-layout/patient-overview-layout.component';

export const PatientRoutes: Routes = [
  {
    path: '',
    component: PatientLayoutComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListPatientPageComponent },
      { path: 'new', component: CreatePatientPageComponent },
      { path: 'edit/:id', component: EditPatientPageComponent },
      { path: 'visits/new', component: CreateVisitPageComponent },
      {
        path: ':patientId',
        component: PatientOverviewLayoutComponent,
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          { path: 'overview', component: PatientOverviewPageComponent },
          { path: 'visit/:visitId', component: VisitDetailsPageComponent },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
];
