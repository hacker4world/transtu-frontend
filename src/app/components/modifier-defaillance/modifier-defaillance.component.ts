import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Defaillance } from '../../models/defaillance.model';
import { DefaillanceService } from '../../services/defaillance.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modifier-defaillance',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modifier-defaillance.component.html',
  styleUrl: './modifier-defaillance.component.css'
})
export class ModifierDefaillanceComponent {
  @Input() public defaillanceData: Defaillance = {  
    agentNom: '',
    agentPrenom: '',
    id: 0,
    nombre_jour: 0,
    dateDebut: '',
    dateFin: '',
    heureDebut: '',
    heureFin: '',
    nbre_heure: 0,
    agentId: 0,
  };
  @Output() public modalClose = new EventEmitter<void>(); 
  @Output() public onDefaillanceUpdated = new EventEmitter<Defaillance>(); 
  error: { show: boolean; message: string; } | undefined;
  constructor(private readonly defaillanceService: DefaillanceService) {}
  
    public closeModal() {
      this.modalClose.emit();
    }
    public onSubmit(): void {
      const { dateDebut, dateFin, heureDebut, heureFin } = this.defaillanceData;
  
      // Vérification des champs obligatoires
      if (dateDebut.trim() === '' || dateFin.trim() === '' || heureDebut.trim() === '' || heureFin.trim() === '') {
        this.error = {
          show: true,
          message: 'Tous les champs sont obligatoires',
        };
      } else if (dateDebut < dateFin) {
        const debut = new Date(dateDebut);
        const fin = new Date(dateFin);
        const diffTime = Math.abs(fin.getTime() - debut.getTime());
        this.defaillanceData.nombre_jour = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.updateDefaillance();
      } else if (dateDebut === dateFin) {
        if (heureDebut < heureFin) {
          const [hStart, mStart] = heureDebut.split(':').map(Number);
          const [hEnd, mEnd] = heureFin.split(':').map(Number);
          const startInMinutes = hStart * 60 + mStart;
          const endInMinutes = hEnd * 60 + mEnd;
          this.defaillanceData.nbre_heure = (endInMinutes - startInMinutes) / 60;
          this.updateDefaillance();
        } else {
          alert('Heure de début doit être avant l\'heure de fin');
        }
      } else {
        alert('Date de début doit être avant ou égale à la date de fin');
      }
    }
  
    private updateDefaillance(): void {
      this.defaillanceService.updateDefaillance(this.defaillanceData.id, this.defaillanceData).subscribe({
        next: (res) => {
          console.log('Défaillance modifiée avec succès', res);
          this.modalClose.emit();
          this.onDefaillanceUpdated.emit(this.defaillanceData);
        },
        error: (err) => {
          console.error('Erreur lors de la modification de la défaillance', err);
          alert("Erreur lors de la modification de la défaillance");
        }
      });
    }

}
