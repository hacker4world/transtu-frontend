import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AgentManagementComponent } from './pages/agent-management/agent-management.component';
import { LoginComponent } from './pages/login/login.component';
import { RequestPasswordResetComponent } from './pages/request-password-reset/request-password-reset.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { TravailPrevuComponent } from './pages/travail-prevu/travail-prevu.component';
import { GestionDefaillancesComponent } from './pages/gestion-defaillances/gestion-defaillances.component';
import { GestionCongesComponent } from './pages/gestion-conges/gestion-conges.component';
import { GestionToursServicesComponent } from './pages/gestion-tours-services/gestion-tours-services.component';
import { HeuresComponent } from './pages/heures/heures.component';
import { AbsencesComponent } from './pages/absences/absences.component';
import { RetardsComponent } from './pages/retards/retards.component';

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
        path: 'gestion-conges',
        component: GestionCongesComponent
      },
      {
        path: 'prevu',
        component: TravailPrevuComponent,
      },
      {
        path: 'tours-services',
        component: GestionToursServicesComponent
      },
      {
        path: 'heures',
        component: HeuresComponent
      },
      {
        path: 'absences',
        component: AbsencesComponent,
      },
      {
        path: 'retards',
        component: RetardsComponent
      }
    ],
  },
];
