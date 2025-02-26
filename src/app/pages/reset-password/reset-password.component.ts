import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  
  resetForm: FormGroup;
  message: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.authService.resetPassword(this.resetForm.value).subscribe(
        response => {
          this.message = 'Mot de passe réinitialisé avec succès!';
          this.errorMessage = '';
        },
        error => {
          this.errorMessage = 'Erreur lors de la réinitialisation. Code invalide ou expiré.';
          console.error(error);
        }
      );
    }
  }
}
