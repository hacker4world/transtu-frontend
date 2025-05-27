import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  public route: string = "";

  constructor(private router: Router) {
   this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(event => {
    this.route = event.url
   })
  }

  public logout() {
    localStorage.removeItem("user");
    this.router.navigate(["../../login"])
  }


}
