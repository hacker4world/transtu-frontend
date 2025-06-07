import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../../services/absence.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.css',
})
export class AbsencesComponent implements OnInit {
  public searchInput: string = '';
  public allAbsences: any[] = [];
  public absences: any[] = [];

  constructor(private readonly absenceService: AbsenceService) {}

  ngOnInit(): void {
    this.absenceService.getAllAbsences().subscribe({
      next: (response: any) => {
        this.absences = response.data;
        this.allAbsences = response.data;
        console.log(response);
      },
    });
  }

  public onSearch() {
    if (this.searchInput.trim() == '') {
      this.absences = this.allAbsences;
    } else {
      let numeric = this.isNumeric(this.searchInput.trim());
      if (numeric)
        this.absences = this.allAbsences.filter(
          (absence) => absence.agentId == Number(this.searchInput)
        );
      else {
        this.absences = this.allAbsences.filter((absence) => {
          return absence.agentName
            .toLowerCase()
            .includes(this.searchInput.trim().toLowerCase());
        });
      }
    }
  }

  public isNumeric(searchInput: string) {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < searchInput.length; i++) {
      if (!numbers.includes(searchInput[i])) {
        return false;
      }
    }
    return true;
  }
}
