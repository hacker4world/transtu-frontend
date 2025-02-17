import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public user: any = null;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (!user) this.router.navigate(['../login']);
    else {
      this.user = JSON.parse(user);
    }
  }
}
