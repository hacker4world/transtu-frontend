import { Component, EventEmitter, Output } from '@angular/core';
import { Defaillance } from '../../models/defaillance.model';
import { DefaillanceService } from '../../services/defaillance.service';
import { FormsModule } from '@angular/forms';
import { WarningComponent } from '../warning/warning.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajouter-defaillance-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ajouter-defaillance-modal.component.html',
  styleUrls: ['./ajouter-defaillance-modal.component.css'],
})
export class AjouterDefaillanceModalComponent {
  @Output() public modalClose = new EventEmitter();
  
 
  public defaillance: Defaillance = {
    agentNom:'',
    agentPrenom:'',
  id:0,
    nombre_jour:0,
    dateDebut: '',
    dateFin: '',
    heureDebut: '',
    heureFin: '',
    nbre_heure: 0,
    agentId:0 ,
  };

  constructor(private defaillanceService: DefaillanceService) {}

  public closeModal() {
    this.modalClose.emit();
  }

  public addDefaillance(): void {
    console.log(this.defaillance);
  
    const { dateDebut, dateFin, heureDebut, heureFin } = this.defaillance;
  
    if (dateDebut < dateFin) {
   
      const debut = new Date(dateDebut);
      const fin = new Date(dateFin);
      const diffTime = Math.abs(fin.getTime() - debut.getTime());
      this.defaillance.nombre_jour = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
      this.envoyerDefaillance();
    }
  
 
    else if (dateDebut === dateFin) {
      if (heureDebut < heureFin) {
    
        const [hStart, mStart] = heureDebut.split(':').map(Number);
        const [hEnd, mEnd] = heureFin.split(':').map(Number);
  
        const startInMinutes = hStart * 60 + mStart;
        const endInMinutes = hEnd * 60 + mEnd;
  
        this.defaillance.nbre_heure = (endInMinutes - startInMinutes) / 60;
  
        this.envoyerDefaillance();
      } else {
        alert('Heure de début doit être avant l\'heure de fin');
      }
    }
  

    else {
      alert('Date de début doit être avant ou égale à la date de fin');
    }
  }
  
  private envoyerDefaillance(): void {
    this.defaillanceService.addDefaillance(this.defaillance).subscribe({
      next: (res) => {
        console.log('Défaillance ajoutée avec succès', res);
        this.closeModal();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la défaillance', err);
        alert("L'agent n'est pas trouvé");
      }
    });
  }
  
}