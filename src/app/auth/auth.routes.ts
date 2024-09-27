import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const AuthRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/notfound' },
];
