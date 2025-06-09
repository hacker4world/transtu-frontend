import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RetardService {
  private url: string = 'http://localhost:8080/api/latency';

  constructor(private readonly httpClient: HttpClient) {}

  public getAllRetards() {
    return this.httpClient.get(this.url + '/all');
  }

  public getAgentRetards(id: any) {
    return this.httpClient.get(this.url + `/agent/${id}`);
  }
}
