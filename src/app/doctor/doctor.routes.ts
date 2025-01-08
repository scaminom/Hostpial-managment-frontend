import { Routes } from '@angular/router';
import { DoctorLayoutComponent } from './layout/doctor-layout/doctor-layout.component';
import { CreateDoctorPageComponent } from './pages/create-doctor-page/create-doctor-page.component';
import { EditDoctorPageComponent } from './pages/edit-doctor-page/edit-doctor-page.component';
import { ListDoctorPageComponent } from './pages/list-doctor-page/list-doctor-page.component';
import { roleGuard } from '@app/shared/guards/role.guard';

export const DoctorRoutes: Routes = [
  {
    path: '',
    component: DoctorLayoutComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListDoctorPageComponent },
      {
        path: 'new',
        component: CreateDoctorPageComponent,
        canActivate: [roleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'edit/:id',
        component: EditDoctorPageComponent,
        canActivate: [roleGuard],
        data: { allowedRoles: ['admin'] },
      },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
];
