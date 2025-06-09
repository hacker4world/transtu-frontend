import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AbsenceService } from '../../services/absence.service';

@Component({
  selector: 'app-agent-absences',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-absences.component.html',
  styleUrl: './agent-absences.component.css',
})
export class AgentAbsencesComponent {
  public searchInput: string = '';
  public allAbsences: any[] = [];
  public absences: any[] = [];

  constructor(private readonly absenceService: AbsenceService) {}

  ngOnInit(): void {
    let agent = localStorage.getItem('user');

    this.absenceService.getAgentAbsences(JSON.parse(agent!).id).subscribe({
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
