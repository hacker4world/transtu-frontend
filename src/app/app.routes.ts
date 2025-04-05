import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AgentManagementComponent } from './pages/agent-management/agent-management.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestPasswordResetComponent } from './pages/request-password-reset/request-password-reset.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { TravailPrevuComponent } from './pages/travail-prevu/travail-prevu.component';
import { GestionDefaillancesComponent } from './pages/gestion-defaillances/gestion-defaillances.component';

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
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'request-password-reset',
    component: RequestPasswordResetComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'agents',
        pathMatch: 'full',
      },
      {
        path: 'agents',
        component: AgentManagementComponent,
      },
      {
        path: 'gestion-defaillances',
        component: GestionDefaillancesComponent,
      },
      {
        path: 'prevu',
        component: TravailPrevuComponent,
      },
    ],
  },
];
