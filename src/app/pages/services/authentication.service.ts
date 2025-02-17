import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private readonly endpoint = "http://localhost:8080/api/auth"

  constructor(private httpClient: HttpClient) {}

  public login(loginData: any) {
    return this.httpClient.post(this.endpoint + "/login", loginData);
  }
}
