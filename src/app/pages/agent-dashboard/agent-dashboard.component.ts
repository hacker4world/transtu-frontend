import { Component } from '@angular/core';
import { AgentSidenavComponent } from '../../components/agent-sidenav/agent-sidenav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [AgentSidenavComponent, RouterOutlet],
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.css'
})
export class AgentDashboardComponent {

}
