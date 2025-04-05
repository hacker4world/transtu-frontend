import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/ApiResponse';
import { Agent } from '../models/Agent.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AgentsService {
  private readonly url: string = 'http://localhost:8080/api/agent';

  constructor(private readonly httpClient: HttpClient) {}

  public fetchAgents(): Observable<Agent[]> {
    return this.httpClient.get<Agent[]>(this.url + '/all');
  }

  public createAgent(agent: Agent): Observable<ApiResponse<Agent>> {
    return this.httpClient.post<ApiResponse<Agent>>(this.url + '/add', agent);
  }

  public deleteAgent(id: number): Observable<ApiResponse<null>> {
    return this.httpClient.delete<ApiResponse<null>>(
      this.url + '/remove/' + id
    );
  }

  public updateAgent(
    id: number,
    agentData: Agent
  ): Observable<ApiResponse<null>> {
    return this.httpClient.put<ApiResponse<null>>(
      this.url + '/update/' + id,
      agentData
    );
  }
}
