import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-request-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css'],
})
export class RequestResetPasswordComponent {
  public email: string = '';

  public error = {
    show: false,
    message: '',
  };

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {}

  public onSubmit(): void {
    if (!this.isValidEmail(this.email))
      this.error = {
        show: true,
        message: 'Addresse email invalide',
      };
    else {
      this.authenticationService
        .requestPasswordReset({ email: this.email })
        .subscribe({
          next: () => {
            console.log('yes');

            this.router.navigate(['../reset-password']);
          },
          error: (err) => {
            if (err.status == 404)
              this.error = {
                show: true,
                message: 'Aucun compte trouvé',
              };

            console.log(err);
          },
        });
    }
  }

  private isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
