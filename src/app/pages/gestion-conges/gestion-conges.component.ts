import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AjouterCongeModalComponent } from "../../components/ajouter-conge-modal/ajouter-conge-modal.component";
import { ModifierCongeComponent } from "../../components/modifier-conge/modifier-conge.component";

@Component({
  selector: 'app-gestion-conges',
  standalone: true,
  imports: [CommonModule, AjouterCongeModalComponent, ModifierCongeComponent],
  templateUrl: './gestion-conges.component.html',
  styleUrl: './gestion-conges.component.css'
})
export class GestionCongesComponent {

  public showAddCongeModal: boolean = false;
  public showModifierCongeModal: boolean = false;

  public setShowAddCongeModal(value: boolean) {
    this.showAddCongeModal = value;
  }

  public setShowModifierCongeModal(value: boolean) {
    this.showModifierCongeModal = value;
  }

}
