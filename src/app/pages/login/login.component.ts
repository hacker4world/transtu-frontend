import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  public modalAlert = {
    show: false,
    message: '',
  };

  public loginData = {
    email: '',
    password: '',
  };

  public login() {
    this.authenticationService.login(this.loginData).subscribe({
      next: (data: any) => {
        console.log(data);

        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(data.data));
        this.router.navigate(['../dashboard']);
      },
      error: () => {
        this.modalAlert = {
          show: true,
          message: 'Addresse out mot de passe invalide',
        };
      },
    });
  }
}
