import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RetardService } from '../../services/retard.service';

@Component({
  selector: 'app-agent-retards',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agent-retards.component.html',
  styleUrl: './agent-retards.component.css',
})
export class AgentRetardsComponent {
  public searchInput: string = '';
  public allRetards: any[] = [];
  public retards: any[] = [];

  constructor(private readonly retardService: RetardService) {}

  ngOnInit(): void {
    let agent = localStorage.getItem('user');

    this.retardService.getAgentRetards(JSON.parse(agent!).id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.retards = response.data;
        this.allRetards = response.data;
      },
    });
  }

  public onSearch() {
    if (this.searchInput.trim() == '') {
      this.retards = this.allRetards;
    } else {
      let numeric = this.isNumeric(this.searchInput.trim());
      if (numeric)
        this.retards = this.allRetards.filter(
          (retard) => retard.agentId == Number(this.searchInput)
        );
      else {
        this.retards = this.allRetards.filter((retard) => {
          return retard.agentName
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
