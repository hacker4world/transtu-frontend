import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AgentsService } from '../../services/agents.service';
import { Agent } from '../../models/Agent.model';
import { WarningComponent } from '../../components/warning/warning.component';
import { CreateAgentModalComponent } from '../../components/create-agent-modal/create-agent-modal.component';
import { UpdateAgentModalComponent } from '../../components/update-agent-modal/update-agent-modal.component';
import { DeleteConfirmModalComponent } from '../../components/delete-confirm-modal/delete-confirm-modal.component';
import { FormsModule } from '@angular/forms';
import { RetardService } from '../../services/retard.service';

@Component({
  selector: 'app-agent-management',
  standalone: true,
  imports: [
    CommonModule,
    WarningComponent,
    CreateAgentModalComponent,
    UpdateAgentModalComponent,
    DeleteConfirmModalComponent,
    FormsModule
  ],
  templateUrl: './agent-management.component.html',
  styleUrl: './agent-management.component.css',
})
export class AgentManagementComponent implements OnInit {
  constructor(private readonly agentsService: AgentsService) {}

  public searchInput: string = "";

  public agentList: Agent[] = [];
  public allAgents: Agent[] = [];

  public showFetchError = false;

  public showAddAgentModal = false;
  public showUpdateAgentModal = false;

  public showDeleteConfirmation = false;

  public agentToDelete = 0;

  public agentToUpdate: Agent = this.agentList[0];

  public setAddAgentModal(open: boolean): void {
    this.showAddAgentModal = open;
  }

  public setUpdateAgentModal(open: boolean): void {
    this.showUpdateAgentModal = open;
  }

  ngOnInit(): void {
    this.agentsService.fetchAgents().subscribe({
      next: (response) => {
        this.agentList = response;
        this.allAgents = response;
      },
      error: () => {
        this.showFetchError = true;
      },
    });
  }

  public createAgent(agentData: Agent): void {
    this.allAgents.push({
      ...agentData,
      district: agentData.district.name,
    });
  }

  public setAgentToDelete(id: number) {
    this.agentToDelete = id;
    this.showDeleteConfirmation = true;
  }

  public closeConfirmation() {
    this.showDeleteConfirmation = false;
  }

  public deleteAgent(): void {
    this.closeConfirmation();

    this.agentsService.deleteAgent(this.agentToDelete).subscribe({
      next: () => {
        this.agentList = this.agentList.filter(
          (agent) => agent.matricule != this.agentToDelete
        );
      },
      error: () => {
        alert("Erreur lors de la suppression de l'agent");
      },
    });
  }

  public setAgentToUpdate(id: number) {
    let targetAgent = this.agentList.find((agent) => agent.matricule == id)!;
    this.agentToUpdate = { ...targetAgent };
    this.setUpdateAgentModal(true);
  }

  public updateAgent(newAgent: Agent) {
    this.allAgents = this.agentList.map((agent) => {
      if (agent.matricule == newAgent.matricule) return { ...newAgent };
      else return agent;
    });
  }

  public onSearch() {
    if (this.searchInput.trim() == "") {
      this.agentList = this.allAgents;
    } else {
      let numeric = this.isNumeric(this.searchInput.trim())
      if (numeric) this.agentList = this.allAgents.filter(agent => agent.matricule == Number(this.searchInput));

      else {
        this.agentList = this.allAgents.filter(agent => {
          return agent.nom.toLowerCase().includes(this.searchInput.trim().toLowerCase()) || 
          agent.prenom.toLowerCase().includes(this.searchInput.trim().toLowerCase()) ||
          (agent.nom + " " + agent.prenom).toLowerCase().includes(this.searchInput.trim().toLowerCase())
        })
      }
    }
    
  }

  public isNumeric(searchInput: string) {
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    for(let i = 0; i < searchInput.length; i++) {
      if (!numbers.includes(searchInput[i])) {
        return false;
      }
    }
    return true;
  }

}
