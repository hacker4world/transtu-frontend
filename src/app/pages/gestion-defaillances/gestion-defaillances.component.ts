import { Component } from '@angular/core';
import { AjouterDefaillanceModalComponent } from '../../components/ajouter-defaillance-modal/ajouter-defaillance-modal.component';
import { CommonModule } from '@angular/common';
import { ModifierDefaillanceComponent } from "../../components/modifier-defaillance/modifier-defaillance.component";

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

  public toggleDefaillancesModal(open: boolean) {
    this.showDefaillancesModal = open;
  }

  public toggleModifierModal(open: boolean) {
    this.showModifierDefaillanceModal = open;
  }
}
