import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/Login.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { LoginResponse } from '../models/LoginResponse.model';
import { ResetPassword } from '../models/ResetPassword.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private url: string = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {}

  public login(loginData: Login): Observable<ApiResponse<LoginResponse>> {
    return this.httpClient.post<ApiResponse<LoginResponse>>(
      this.url + '/login',
      loginData
    );
  }

  public sendResetEmail(email: string): Observable<ApiResponse<null>> {
    return this.httpClient.post<ApiResponse<null>>(
      this.url + '/send-reset-email',
      { email }
    );
  }

  public resetPassword(
    resetData: ResetPassword
  ): Observable<ApiResponse<null>> {
    return this.httpClient.post<ApiResponse<null>>(
      this.url + '/reset-password',
      resetData
    );
  }
}
