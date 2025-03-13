import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private apiUrl = 'http://localhost:8080/api/agent'; 

  constructor(private http: HttpClient) { }

  addAgent(agentData: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, agentData)
  }

  removeAgent(matricule: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/remove/${matricule}`);
  }

  updateAgent(id: number, agentData: any): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/update/${id}`, agentData);
  }

  
  getAllAgents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }


}
