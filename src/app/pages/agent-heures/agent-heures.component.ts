import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgentHeuresFilterComponent } from "../../components/agent-heures-filter/agent-heures-filter.component";

@Component({
  selector: 'app-agent-heures',
  standalone: true,
  imports: [CommonModule, AgentHeuresFilterComponent],
  templateUrl: './agent-heures.component.html',
  styleUrl: './agent-heures.component.css',
})
export class AgentHeuresComponent {
  public data = {
    heures_jour: 0,
    heures_nuit: 0,
    jours_absences: 0,
    jours_defaillances: 0,
    jours_conges: 0,
    agentName: '',
  };

  public modal = false;

  public setModal(open: boolean) {
    this.modal = open;
  }

  public setData(data: any) {
    this.data = data;
    this.setModal(false);
  }
}
