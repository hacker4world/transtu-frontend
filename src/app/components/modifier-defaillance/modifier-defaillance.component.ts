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
  styleUrl: './modifier-defaillance.component.css',
})
export class ModifierDefaillanceComponent {
  @Input() public defaillanceData: any = null;
  @Output() public modalClose = new EventEmitter<void>();
  @Output() public onDefaillanceUpdated = new EventEmitter<Defaillance>();
  error: { show: boolean; message: string } | undefined;
  constructor(private readonly defaillanceService: DefaillanceService) {
    console.log(this.defaillanceData);
  }

  public closeModal() {
    this.modalClose.emit();
  }
  public onSubmit(): void {
    const { dateDebut, dateFin } = this.defaillanceData;

    // Vérification des champs obligatoires
    if (dateDebut.trim() === '' || dateFin.trim() === '') {
      this.error = {
        show: true,
        message: 'Tous les champs sont obligatoires',
      };
    } else if (dateDebut > dateFin) {
      this.error = {
        show: true,
        message: 'Date de debut doit etre avant date de fin',
      };
    } else {
      const debut = new Date(dateDebut);
      const fin = new Date(dateFin);
      const diffTime = Math.abs(fin.getTime() - debut.getTime());
      this.defaillanceData.nombre_jour = Math.ceil(
        diffTime / (1000 * 60 * 60 * 24)
      );
      this.updateDefaillance();
    }
  }

  private updateDefaillance(): void {
    this.defaillanceService
      .updateDefaillance(this.defaillanceData.id, this.defaillanceData)
      .subscribe({
        next: (res) => {
          console.log(this.defaillanceData);
          this.onDefaillanceUpdated.emit(this.defaillanceData);
        },
        error: (err) => {
          console.error(
            'Erreur lors de la modification de la défaillance',
            err
          );
          alert('Erreur lors de la modification de la défaillance');
        },
      });
  }
}
