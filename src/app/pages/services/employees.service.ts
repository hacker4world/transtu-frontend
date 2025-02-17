import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly endpoint = 'http://localhost:8080/api/employee';

  constructor(private readonly httpClient: HttpClient) {}

  public fetchEmployees(department: number) {
    return this.httpClient.get(this.endpoint + '/all/' + department);
  }

  public createNewEmployee(employeeData: any) {
    return this.httpClient.post(this.endpoint + '/create', employeeData);
  }

  public supprimerEmployee(employeeId: number) {
    return this.httpClient.delete(this.endpoint + "/delete/" + employeeId)
  }

}
