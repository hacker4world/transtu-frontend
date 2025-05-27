import { Component, EventEmitter, Output } from '@angular/core';
import { WarningComponent } from '../warning/warning.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CongeService } from '../../services/conge.service';

@Component({
  selector: 'app-ajouter-conge-modal',
  standalone: true,
  imports: [WarningComponent, CommonModule, FormsModule],
  templateUrl: './ajouter-conge-modal.component.html',
  styleUrl: './ajouter-conge-modal.component.css',
})
export class AjouterCongeModalComponent {
  public error = {
    show: false,
    message: '',
  };

  public congeData = {
    agentId: 0,
    dateDebut: '',
    dateFin: '',
  };

  @Output() modalClose = new EventEmitter();
  @Output() congeCreated = new EventEmitter();

  constructor(private readonly congeService: CongeService) {}

  public onClose() {
    this.modalClose.emit();
  }

  public addConge() {
    if (this.congeData.dateDebut == '' || this.congeData.dateFin == '') {
      this.error = {
        show: true,
        message: 'Tous les champs sont obligatoires',
      };
    } else if (this.congeData.dateDebut > this.congeData.dateFin)
      this.error = {
        show: true,
        message: 'Date de debut doit etre avant date de fin',
      };
    else {
      this.congeService.addConge(this.congeData).subscribe({
        next: (response: any) => {
          this.congeCreated.emit(response.data)
        },
        error: (error) => {
          this.error = {
            show: true,
            message: error.error.message,
          };
        },
      });
    }
  }
}
