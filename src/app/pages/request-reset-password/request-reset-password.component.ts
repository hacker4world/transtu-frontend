import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-request-reset-password',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent {
  
  requestForm: FormGroup;
  message: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
    this.requestForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      this.authService.requestPasswordReset(this.requestForm.value).subscribe({
        next: (response) => {
          this.message = 'Un email de réinitialisation a été envoyé.';
          this.errorMessage = '';
        },
        error: (error) => {
          this.errorMessage = 'Email incorrect ou problème serveur.';
          console.error(error);
        }
      });
    }
  }
}
