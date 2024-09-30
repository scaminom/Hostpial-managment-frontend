import { Routes } from '@angular/router';
import { DepartmentLayoutComponent } from './layout/department-layout/department-layout.component';
import { CreateDepartmentPageComponent } from './pages/create-department-page/create-department-page.component';
import { EditDepartmentPageComponent } from './pages/edit-department-page/edit-department-page.component';
import { ListDepartmentPageComponent } from './pages/list-department-page/list-department-page.component';

export const DepartmentRoutes: Routes = [
  {
    path: '',
    component: DepartmentLayoutComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: ListDepartmentPageComponent },
      { path: 'new', component: CreateDepartmentPageComponent },
      { path: 'edit/:id', component: EditDepartmentPageComponent },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
];
