import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CreateAgentModalComponent } from "../../components/create-agent-modal/create-agent-modal.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidenavComponent, RouterOutlet, CreateAgentModalComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
      let user = localStorage.getItem("user");
      if (!user) this.router.navigate(["../login"])
  }
}
