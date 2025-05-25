import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AgentsService } from '../../services/agents.service';
import { Agent } from '../../models/Agent.model';
import { WarningComponent } from '../warning/warning.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-agent-modal',
  standalone: true,
  imports: [WarningComponent, FormsModule, CommonModule],
  templateUrl: './update-agent-modal.component.html',
  styleUrl: './update-agent-modal.component.css',
})
export class UpdateAgentModalComponent implements OnInit {
  @Input() public agentData!: Agent;

  @Output() public modalClose = new EventEmitter();
  @Output() public onAgentUpdated = new EventEmitter<Agent>();

  ngOnInit(): void {
    console.log(this.agentData);
  }

  public error = {
    show: false,
    message: '',
  };

  constructor(private readonly agentService: AgentsService) {}

  public onClose() {
    this.modalClose.emit();
  }

  public onSubmit() {
    if (
      this.agentData.nom.trim() === '' ||
      this.agentData.prenom.trim() === '' ||
      this.agentData.date_naiss.trim() === '' ||
      this.agentData.situation_familiale.trim() === '' ||
      this.agentData.code_emploi_assure.trim() === '' ||
      this.agentData.code_grade.trim() === '' ||
      this.agentData.role.trim() === ''
    ) {
      this.error = {
        show: true,
        message: 'Tous les champs sont obligatoires',
      };
    } else {
      this.agentService
        .updateAgent(this.agentData.matricule, this.agentData)
        .subscribe({
          next: () => {
            this.modalClose.emit();
            this.onAgentUpdated.emit(this.agentData);
          },
          error: () => {
            this.error = {
              show: true,
              message: "Erreur de modification d'agent",
            };
          },
        });
    }
  }
}
