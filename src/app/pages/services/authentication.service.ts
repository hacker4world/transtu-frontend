import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly endpoint = 'http://localhost:8080/api/auth';

  constructor(private httpClient: HttpClient) {}

  public login(loginData: any) {
    return this.httpClient.post(this.endpoint + '/login', loginData);
  }
  requestPasswordReset(data: { email: string }): Observable<any> {
    return this.httpClient.post(`${this.endpoint}/send-reset-email`, data);
  }
  resetPassword(data: {
    email: string;
    code: string;
    newPassword: string;
  }): Observable<any> {
    return this.httpClient.post(`${this.endpoint}/reset-password`, data);
  }
}
