import { Component, EventEmitter, Output } from '@angular/core';
import { Defaillance } from '../../models/defaillance.model';
import { DefaillanceService } from '../../services/defaillance.service';
import { FormsModule } from '@angular/forms';
import { WarningComponent } from '../warning/warning.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-defaillance-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, WarningComponent],
  templateUrl: './ajouter-defaillance-modal.component.html',
  styleUrls: ['./ajouter-defaillance-modal.component.css'],
})
export class AjouterDefaillanceModalComponent {
  @Output() public modalClose = new EventEmitter();
  @Output() public defaillanceCreated = new EventEmitter();

  public modalError = {
    show: false,
    message: '',
  };

  public defaillance: Defaillance = {
    agentNom: '',
    agentPrenom: '',
    id: 0,
    nombre_jour: 0,
    dateDebut: '',
    dateFin: '',
    agentId: 0,
  };

  constructor(private defaillanceService: DefaillanceService) {}

  public closeModal() {
    this.modalClose.emit();
  }

  public addDefaillance(): void {
    console.log(this.defaillance);

    const { dateDebut, dateFin } = this.defaillance;

    if (dateDebut < dateFin) {
      const debut = new Date(dateDebut);
      const fin = new Date(dateFin);
      const diffTime = Math.abs(fin.getTime() - debut.getTime());
      this.defaillance.nombre_jour = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
      );

      this.envoyerDefaillance();
    } else {
      this.modalError = {
        show: true,
        message: 'Date de début doit être avant la date de fin',
      };
    }
  }

  private envoyerDefaillance(): void {
    this.defaillanceService.addDefaillance(this.defaillance).subscribe({
      next: (res) => {
        this.defaillanceCreated.emit(res.data);
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout de la défaillance", err);
        this.modalError = {
          show: true,
          message: "L'agent n'est pas trouvé",
        };
      },
    });
  }
}
