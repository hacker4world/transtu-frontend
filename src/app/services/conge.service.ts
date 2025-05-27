import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CongeService {
  private url: string = 'http://localhost:8080/api/conge';

  constructor(private readonly httpClient: HttpClient) {}

  public addConge(data: any) {
    return this.httpClient.post(this.url + '/ajouter', data);
  }

  public getAllConges() {
    return this.httpClient.get(this.url + '/all');
  }

  public updateConge() {
    
  }

  public deleteConge(id: any) {
    return this.httpClient.delete(this.url + `/delete/${id}`)
  }

}
