import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-agent-sidenav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './agent-sidenav.component.html',
  styleUrl: './agent-sidenav.component.css',
})
export class AgentSidenavComponent {
  public route: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.route = event.url;
      });
  }

  public logout() {
    localStorage.removeItem('user');
    this.router.navigate(['../../login']);
  }
}
