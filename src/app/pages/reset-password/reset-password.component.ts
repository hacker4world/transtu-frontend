import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  public resetPasswordData = {
    email: '',
    code: '',
    newPassword: '',
  };

  public error = {
    display: false,
    message: '',
  };

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  public onSubmit() {
    if (!this.isValidEmail(this.resetPasswordData.email))
      this.error = {
        display: true,
        message: 'Email invalide',
      };
    else if (this.resetPasswordData.code.length != 5)
      this.error = {
        display: true,
        message: 'Code invalide',
      };
    else if (this.resetPasswordData.newPassword.length < 8)
      this.error = {
        display: true,
        message: 'Mot de passe doit etre 8 characteres au minimum',
      };
    else {
      this.authenticationService
        .resetPassword(this.resetPasswordData)
        .subscribe({
          next: () => {
            this.router.navigate(['../login']);
          },
          error: (err) => {
            if (err.status == 404)
              this.error = {
                display: true,
                message: 'Aucun compte trouve avec cet email',
              };
            else if (err.status == 403)
              this.error = {
                display: true,
                message: 'Code de recuperation incorrect',
              };
          },
        });
    }
  }

  private isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
