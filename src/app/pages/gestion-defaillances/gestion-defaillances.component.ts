import { Component } from '@angular/core';
import { AjouterDefaillanceModalComponent } from '../../components/ajouter-defaillance-modal/ajouter-defaillance-modal.component';
import { CommonModule } from '@angular/common';
import { ModifierDefaillanceComponent } from "../../components/modifier-defaillance/modifier-defaillance.component";
import { Defaillance } from '../../models/defaillance.model';
import { DefaillanceService } from '../../services/defaillance.service';

@Component({
  selector: 'app-gestion-defaillances',
  standalone: true,
  imports: [AjouterDefaillanceModalComponent, CommonModule, ModifierDefaillanceComponent],
  templateUrl: './gestion-defaillances.component.html',
  styleUrl: './gestion-defaillances.component.css',
})
export class GestionDefaillancesComponent {
  public showDefaillancesModal = false;
  public showModifierDefaillanceModal = false;
  public defaillances: Defaillance[] = [];
    

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
          console.error('La réponse n\'est pas un tableau de défaillances.');
        }
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des défaillances', err);
      }
    });
  }
  
  
  deleteDefaillance(id: number): void {
    this.defaillanceService.deleteDefaillance(id).subscribe({
      next: () => {
        this.loadDefaillances(); 
      },
      error: (err: any) => {
        console.error('Erreur lors de la suppression', err);
      }
    });
  }
}
