import { Component, EventEmitter, Output } from '@angular/core';
import { Agent } from '../../models/Agent.model';
import { FormsModule } from '@angular/forms';
import { WarningComponent } from '../warning/warning.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { AgentsService } from '../../services/agents.service';

@Component({
  selector: 'app-create-agent-modal',
  standalone: true,
  imports: [FormsModule, WarningComponent, CommonModule],
  templateUrl: './create-agent-modal.component.html',
  styleUrl: './create-agent-modal.component.css',
})
export class CreateAgentModalComponent {
  @Output() public modalClose = new EventEmitter();
  @Output() public onAgentCreated = new EventEmitter<Agent>();

  public agentData: Agent = {
    nom: '',
    prenom: '',
    date_naiss: '',
    situation_familiale: '',
    code_emploi_assure: '',
    code_grade: '',
    role: '',
    departement: '',
    matricule: 0,
    adminId: 0,
  };

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
      let user = JSON.parse(localStorage.getItem('user')!);

      this.agentService
        .createAgent({ ...this.agentData, adminId: user.id })
        .subscribe({
          next: (response) => {
            this.onAgentCreated.emit(response.data);
            this.modalClose.emit();
          },
          error: () => {
            this.error = {
              show: true,
              message: "Erreur de création d'agent",
            };
          },
        });
    }
  }
}
