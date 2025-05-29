import { Component, EventEmitter, Output } from '@angular/core';
import { AgentsService } from '../../services/agents.service';
import { FormsModule } from '@angular/forms';
import { WarningComponent } from "../warning/warning.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heures-modal',
  standalone: true,
  imports: [FormsModule, WarningComponent, CommonModule],
  templateUrl: './heures-modal.component.html',
  styleUrl: './heures-modal.component.css'
})
export class HeuresModalComponent {
  @Output() modalClose = new EventEmitter();
  @Output() onData = new EventEmitter();

  public data = {
    agentId: 0,
    dateDebut: "",
    dateFin: ""
  }

  public modalError = {
    show: false,
    message: ""
  }

  constructor(private readonly agentService: AgentsService) {}

  public closeModal() {
    this.modalClose.emit();
  }

  public filter() {
    if (this.data.dateDebut == "" || this.data.dateFin == "") {
      this.modalError = {
        message: "Tous les champs sont obligatoires",
        show: true
      }
    }
    else if (this.data.dateDebut > this.data.dateFin) {
      this.modalError = {
        message: "Date debut doit etre avant date de fin",
        show: true
      }
    }
    else {
      this.agentService.calculHeures(this.data)
        .subscribe({
          next: (response: any) => {
            this.onData.emit(response.data)
          }
        })
    }

  }

}
