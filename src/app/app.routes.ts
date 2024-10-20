import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AppLayoutComponent } from './layout/app-layout.component';
import { authGuard } from './auth/auth.guard';
import { publicGuard } from './auth/public.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'patient',
        loadChildren: () =>
          import('./patient/patient.routes').then((m) => m.PatientRoutes),
      },
      {
        path: 'department',
        loadChildren: () =>
          import('./department/department.routes').then(
            (m) => m.DepartmentRoutes,
          ),
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('./doctor/doctor.routes').then((m) => m.DoctorRoutes),
      },
      {
        path: 'medical-record',
        loadChildren: () =>
          import('./medical-record/medical-record.routes').then(
            (m) => m.MedicalRecordRoutes,
          ),
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AuthRoutes),
    canActivate: [publicGuard],
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];
