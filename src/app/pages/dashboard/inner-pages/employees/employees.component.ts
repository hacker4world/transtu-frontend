import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../../../services/employees.service';
import { CommonModule } from '@angular/common';
import { CreationModalComponent } from '../../components/creation-modal/creation-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, CreationModalComponent, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  public user: any = null;

  public employees: any[] = [];

  public creationModal: boolean = false;

  public nouveauEmployee = {
    firstName: '',
    lastName: '',
    email: '',
    departementId: 0,
  };

  constructor(
    private readonly router: Router,
    private readonly employeeService: EmployeesService
  ) {}

  ngOnInit(): void {
    let user = localStorage.getItem('user');
    if (!user) this.router.navigate(['../login']);
    else {
      this.user = JSON.parse(user);
      let departement = this.user.departmentId;
      this.employeeService.fetchEmployees(departement).subscribe({
        next: (data: any) => {
          console.log(data.data);

          this.employees = data.data;
        },
      });
    }
  }

  public creerEmployee() {
    this.nouveauEmployee.departementId = this.user.departmentId;

    this.employeeService.createNewEmployee(this.nouveauEmployee).subscribe({
      next: (data: any) => {
        this.employees.push(data.data);
        this.setCreationModal(false);
      },
    });
  }

  public setCreationModal(open: boolean) {
    this.creationModal = open;
  }

  public supprimerEmployee(employeeId: number) {
    this.employeeService.supprimerEmployee(employeeId).subscribe({
      next: () => {
        this.employees = this.employees.filter((e) => e.id != employeeId);
      },
    });
  }
}
