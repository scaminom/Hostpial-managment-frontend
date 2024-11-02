import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AppLayoutComponent } from './layout/app-layout.component';
import { authGuard } from './auth/auth.guard';
import { publicGuard } from './auth/public.guard';
import { UnauthorizedPageComponent } from './shared/components/unauthorized-page/unauthorized-page.component';
import { roleGuard } from './shared/guards/role.guard';

// enum :role, { guess: 0, admin: 1, doctor: 2, nurse: 3 }

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'patient',
        pathMatch: 'full',
      },
      {
        path: 'patient',
        loadChildren: () =>
          import('./patient/patient.routes').then((m) => m.PatientRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: ['admin', 'doctor', 'nurse'] },
      },
      {
        path: 'department',
        loadChildren: () =>
          import('./department/department.routes').then(
            (m) => m.DepartmentRoutes,
          ),
        canActivate: [roleGuard],
        data: { allowedRoles: ['admin', 'nurse'] },
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('./doctor/doctor.routes').then((m) => m.DoctorRoutes),
        canActivate: [roleGuard],
        data: { allowedRoles: ['admin', 'nurse'] },
      },
      {
        path: 'medical-record',
        loadChildren: () =>
          import('./medical-record/medical-record.routes').then(
            (m) => m.MedicalRecordRoutes,
          ),
        data: { allowedRoles: ['admin', 'doctor', 'nurse'] },
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedPageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AuthRoutes),
    canActivate: [publicGuard],
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound' },
];
