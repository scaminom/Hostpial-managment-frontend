import { Routes } from '@angular/router';

export const DepartmentRoutes: Routes = [
  { path: '**', redirectTo: '/notfound' },
];
