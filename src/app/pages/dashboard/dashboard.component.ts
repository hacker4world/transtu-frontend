import { Component } from '@angular/core';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';
import { CreateAgentModalComponent } from "../../components/create-agent-modal/create-agent-modal.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet, CreateAgentModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
