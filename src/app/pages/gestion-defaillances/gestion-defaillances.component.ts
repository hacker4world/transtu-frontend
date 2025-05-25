import { Component } from '@angular/core';
import { AjouterDefaillanceModalComponent } from '../../components/ajouter-defaillance-modal/ajouter-defaillance-modal.component';
import { CommonModule } from '@angular/common';
import { ModifierDefaillanceComponent } from '../../components/modifier-defaillance/modifier-defaillance.component';
import { Defaillance } from '../../models/defaillance.model';
import { DefaillanceService } from '../../services/defaillance.service';
import { DeleteConfirmModalComponent } from '../../components/delete-confirm-modal/delete-confirm-modal.component';

@Component({
  selector: 'app-gestion-defaillances',
  standalone: true,
  imports: [
    AjouterDefaillanceModalComponent,
    CommonModule,
    ModifierDefaillanceComponent,
    DeleteConfirmModalComponent,
  ],
  templateUrl: './gestion-defaillances.component.html',
  styleUrl: './gestion-defaillances.component.css',
})
export class GestionDefaillancesComponent {
  public showDefaillancesModal = false;
  public showModifierDefaillanceModal = false;
  public defaillances: Defaillance[] = [];
  public defaillanceToUpdate: any = null;
  public defaillanceToDelete: any = null;
  public showConfirmationModal = false;

  constructor(private readonly defaillanceService: DefaillanceService) {}
  ngOnInit(): void {
    this.loadDefaillances();
  }
  public toggleDefaillancesModal(open: boolean) {
    this.showDefaillancesModal = open;
  }

  public toggleModifierModal(open: boolean) {
    this.showModifierDefaillanceModal = open;
  }
  loadDefaillances(): void {
    this.defaillanceService.getAllDefaillances().subscribe({
      next: (res) => {
        console.log('Réponse complète:', res);
        if (Array.isArray(res)) {
          this.defaillances = res;
          console.log('Défaillances:', this.defaillances);
        } else {
          console.error("La réponse n'est pas un tableau de défaillances.");
        }
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des défaillances', err);
      },
    });
  }

  public closeConfirmation() {
    this.showConfirmationModal = false;
  }

  public addDefaillance(data: any) {
    this.showDefaillancesModal = false;
    console.log(data);

    this.defaillances.push(data);
  }

  public setDefaillanceToUpdate(id: number) {
    let defaillance = this.defaillances.find((d) => d.id === id);
    this.defaillanceToUpdate = { ...defaillance };
    this.toggleModifierModal(true);
  }

  updateDefaillance($event: Defaillance) {
    this.defaillances = this.defaillances.map((d) => {
      if (d.id === this.defaillanceToUpdate.id) return { ...$event };
      else return d;
    });
    this.toggleModifierModal(false);
  }

  setDefaillanceToDelete(id: number) {
    this.defaillanceToDelete = this.defaillances.find((d) => d.id === id);
    this.showConfirmationModal = true;
  }

  deleteDefaillance(): void {
    this.defaillanceService
      .deleteDefaillance(this.defaillanceToDelete.id)
      .subscribe({
        next: () => {
          this.loadDefaillances();
          this.closeConfirmation()
        },
        error: (err: any) => {
          console.error('Erreur lors de la suppression', err);
        },
      });
  }
}
