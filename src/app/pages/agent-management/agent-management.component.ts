import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AgentsService } from '../../services/agents.service';
import { Agent } from '../../models/Agent.model';
import { WarningComponent } from '../../components/warning/warning.component';
import { CreateAgentModalComponent } from '../../components/create-agent-modal/create-agent-modal.component';
import { UpdateAgentModalComponent } from '../../components/update-agent-modal/update-agent-modal.component';

@Component({
  selector: 'app-agent-management',
  standalone: true,
  imports: [
    CommonModule,
    WarningComponent,
    CreateAgentModalComponent,
    UpdateAgentModalComponent,
  ],
  templateUrl: './agent-management.component.html',
  styleUrl: './agent-management.component.css',
})
export class AgentManagementComponent implements OnInit {
  constructor(private readonly agentsService: AgentsService) {}

  public agentList: Agent[] = [];

  public showFetchError = false;

  public showAddAgentModal = false;
  public showUpdateAgentModal = false;

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
      },
      error: () => {
        this.showFetchError = true;
      },
    });
  }

  public createAgent(agentData: Agent): void {
    this.agentList.push(agentData);
  }

  public deleteAgent(id: number): void {
    this.agentsService.deleteAgent(id).subscribe({
      next: () => {
        this.agentList = this.agentList.filter(
          (agent) => agent.matricule != id
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
    this.agentList = this.agentList.map((agent) => {
      if (agent.matricule == newAgent.matricule) return { ...newAgent };
      else return agent;
    });
  }
}
