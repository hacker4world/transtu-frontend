import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../../models/Login.model';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { WarningComponent } from '../../components/warning/warning.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, WarningComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  public loginData: Login = {
    email: '',
    password: '',
  };

  public loginError = {
    show: false,
    message: '',
  };

  public onLogin(): void {
    this.authenticationService.login(this.loginData).subscribe({
      next: (response) => {
        let userData = response.data;

        localStorage.setItem('user', JSON.stringify(userData));

        if (userData.role == 'admin') {
          this.router.navigate(['../dashboard']);
        } else if (userData.role == 'agent') {
          this.router.navigate(['../agent']);
        } else {
          this.loginError = {
            show: true,
            message:
              'L’utilisation du tableau de bord est réservée aux administrateurs et aux agents',
          };
        }
      },
      error: (error) => {
        if (error.status === 403) {
          this.loginError = {
            show: true,
            message: 'Identifiants de connexion invalides',
          };
        } else {
          this.loginError = {
            show: true,
            message: 'Erreur de connexion',
          };
        }
      },
    });
  }
}
