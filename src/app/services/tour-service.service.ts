import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TourServiceResponse } from '../models/TourServiceResponse.model';

@Injectable({
  providedIn: 'root',
})
export class TourServiceService {
  private readonly url: string = 'http://localhost:8080/api/pointage';

  constructor(private httpClient: HttpClient) {}

  public getToursByDate(date: string): Observable<TourServiceResponse[]> {
    return this.httpClient.get<TourServiceResponse[]>(
      this.url + '/get-tours/' + date
    );
  }

  public genererTravailPrevu(): Observable<TourServiceResponse[]> {
    return this.httpClient.get<TourServiceResponse[]>(
      this.url + '/generer-travail-prevu'
    );
  }
}
