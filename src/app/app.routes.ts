import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { EmployeesComponent } from './pages/dashboard/inner-pages/employees/employees.component';
import { PointageComponent } from './pages/dashboard/inner-pages/pointage/pointage.component';

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
        path: 'pointage',
        component: PointageComponent,
      },
    ],
  },
];
