import { Injectable } from '@angular/core';
import { Defaillance } from '../models/defaillance.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class DefaillanceService {

   private apiUrl = 'http://localhost:8080/api/defaillances'; 

  constructor(private http: HttpClient) {}

  addDefaillance(dto: Defaillance): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/add`, dto);
  }

  updateDefaillance(id: number, dto: Defaillance): Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(`${this.apiUrl}/${id}`, dto);
  }

  deleteDefaillance(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
  getAllDefaillances(): Observable<ApiResponse<Defaillance[]>> {
    return this.http.get<ApiResponse<Defaillance[]>>(`${this.apiUrl}/all`);
  }
  getDefaillanceById(id: number): Observable<Defaillance> {
    return this.http.get<Defaillance>(`${this.apiUrl}/${id}`);
  }
}
