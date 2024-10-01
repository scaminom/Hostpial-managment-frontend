import { Routes } from '@angular/router';
import { DoctorLayoutComponent } from './layout/doctor-layout/doctor-layout.component';
import { CreateDoctorPageComponent } from './pages/create-doctor-page/create-doctor-page.component';
import { EditDoctorPageComponent } from './pages/edit-doctor-page/edit-doctor-page.component';
import { ListDoctorPageComponent } from './pages/list-doctor-page/list-doctor-page.component';

export const DoctorRoutes: Routes = [
  {
    path: '',
    component: DoctorLayoutComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListDoctorPageComponent },
      { path: 'new', component: CreateDoctorPageComponent },
      { path: 'edit/:id', component: EditDoctorPageComponent },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
];
