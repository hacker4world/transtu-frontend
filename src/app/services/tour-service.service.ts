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

  public getToursByDate(
    day: number,
    month: number,
    year: number,
    email: string
  ): Observable<TourServiceResponse[]> {
    return this.httpClient.post<TourServiceResponse[]>(this.url + '/tours', {
      day,
      month,
      year,
      email,
    });
  }

  public genererTravailPrevu(data: any): Observable<TourServiceResponse[]> {
    console.log(data);

    return this.httpClient.post<TourServiceResponse[]>(
      this.url + '/prevu',
      data
    );
  }
}
