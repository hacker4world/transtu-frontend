import { Component } from '@angular/core';
import { AjouterDefaillanceModalComponent } from '../../components/ajouter-defaillance-modal/ajouter-defaillance-modal.component';
import { CommonModule } from '@angular/common';
import { ModifierDefaillanceComponent } from '../../components/modifier-defaillance/modifier-defaillance.component';
import { Defaillance } from '../../models/defaillance.model';
import { DefaillanceService } from '../../services/defaillance.service';
import { DeleteConfirmModalComponent } from '../../components/delete-confirm-modal/delete-confirm-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-defaillances',
  standalone: true,
  imports: [
    AjouterDefaillanceModalComponent,
    CommonModule,
    ModifierDefaillanceComponent,
    DeleteConfirmModalComponent,
    FormsModule
  ],
  templateUrl: './gestion-defaillances.component.html',
  styleUrl: './gestion-defaillances.component.css',
})
export class GestionDefaillancesComponent {
  public searchInput: string = "";
  public showDefaillancesModal = false;
  public showModifierDefaillanceModal = false;
  public allDefaillances: Defaillance[] = [];
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
          this.allDefaillances = res;
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

  public onSearch() {
    if (this.searchInput.trim() == "") {
      this.defaillances = this.allDefaillances;
    } else {
      let numeric = this.isNumeric(this.searchInput.trim())
      if (!numeric) {
        this.defaillances = this.allDefaillances.filter(defaillance => {
          return defaillance.agentNom.toLowerCase().includes(this.searchInput.trim().toLowerCase()) || 
          defaillance.agentPrenom.toLowerCase().includes(this.searchInput.trim().toLowerCase()) ||
          (defaillance.agentNom + " " + defaillance.agentPrenom).toLowerCase().includes(this.searchInput.trim().toLowerCase())
        })
      }
      else this.defaillances = this.allDefaillances.filter(defaillance => defaillance.agentId == Number(this.searchInput));
    }
    
  }

  private isNumeric(searchInput: string) {
    let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

    for(let i = 0; i < searchInput.length; i++) {
      if (!numbers.includes(searchInput[i])) {
        return false;
      }
    }
    return true;
  }
}
