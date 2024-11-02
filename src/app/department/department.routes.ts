import { Routes } from '@angular/router';
import { DepartmentLayoutComponent } from './layout/department-layout/department-layout.component';
import { CreateDepartmentPageComponent } from './pages/create-department-page/create-department-page.component';
import { EditDepartmentPageComponent } from './pages/edit-department-page/edit-department-page.component';
import { ListDepartmentPageComponent } from './pages/list-department-page/list-department-page.component';
import { roleGuard } from '@app/shared/guards/role.guard';

export const DepartmentRoutes: Routes = [
  {
    path: '',
    component: DepartmentLayoutComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: ListDepartmentPageComponent,
      },
      {
        path: 'new',
        component: CreateDepartmentPageComponent,
        canActivate: [roleGuard],
        data: { allowedRoles: ['admin'] },
      },
      {
        path: 'edit/:id',
        component: EditDepartmentPageComponent,
        canActivate: [roleGuard],
        data: { allowedRoles: ['admin'] },
      },
    ],
  },
  { path: '**', redirectTo: '/notfound' },
];
