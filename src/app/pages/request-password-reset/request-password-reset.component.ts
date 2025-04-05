import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { WarningComponent } from '../../components/warning/warning.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-password-reset',
  standalone: true,
  imports: [RouterModule, FormsModule, WarningComponent, CommonModule],
  templateUrl: './request-password-reset.component.html',
  styleUrl: './request-password-reset.component.css',
})
export class RequestPasswordResetComponent {
  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) {}

  public email: string = '';

  public error = {
    show: false,
    message: '',
  };

  public onEmailSend() {
    if (!this.isValidEmailStrict(this.email)) {
      this.error = {
        show: true,
        message: 'Adresse e-mail est invalide',
      };
    } else {
      this.authenticationService.sendResetEmail(this.email).subscribe({
        next: () => {
          this.error.show = false;
          localStorage.setItem('restore-email', this.email);
          this.router.navigate(['../change-password']);
        },
        error: (error) => {
          if (error.status === 404) {
            this.error = {
              show: true,
              message: 'Aucun compte trouvé avec cet email',
            };
          } else {
            this.error = {
              show: true,
              message: "Échec de l'envoi de l'e-mail de récupération",
            };
          }
        },
      });
    }
  }

  public isValidEmailStrict(email: string) {
    const strictRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return strictRegex.test(email);
  }
}
