import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WarningComponent } from '../../components/warning/warning.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ResetPassword } from '../../models/ResetPassword.model';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterModule, WarningComponent, CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  public error = {
    show: false,
    message: '',
  };

  public resetData = {
    code: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  public onReset(): void {
    if (
      this.resetData.code == '' ||
      this.resetData.password == '' ||
      this.resetData.confirmPassword == ''
    ) {
      this.error = {
        show: true,
        message: 'Tous les champs sont obligatoires',
      };
    } else if (this.resetData.password.length < 10) {
      this.error = {
        show: true,
        message: 'Le mot de passe doit contenir au moins 10 caractères',
      };
    } else if (this.resetData.password != this.resetData.confirmPassword) {
      this.error = {
        show: true,
        message: 'Le mot de passe et la confirmation ne correspondent pas',
      };
    } else {
      let reset: ResetPassword = {
        code: this.resetData.code,
        newPassword: this.resetData.password,
        email: localStorage.getItem('restore-email')!,
      };

      this.authenticationService.resetPassword(reset).subscribe({
        next: () => {
          this.router.navigate(['../login']);
        },
        error: (error) => {
          if (error.status === 403) {
            this.error = {
              show: true,
              message: 'Le code de récupération est incorrect',
            };
          } else {
            this.error = {
              show: true,
              message: 'Erreur de modification du mot de passe',
            };
          }
        },
      });
    }
  }
}
