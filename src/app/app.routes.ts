import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { EmployeesComponent } from './pages/dashboard/inner-pages/employees/employees.component';
import { RequestResetPasswordComponent } from './pages/request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { PrevuComponent } from './pages/dashboard/inner-pages/prevu/prevu.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'send-reset-email',
    component: RequestResetPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      },
      {
        path: 'employees',
        component: EmployeesComponent,
      },
      {
        path: 'prevu',
        component: PrevuComponent,
      },
    ],
  },
];
