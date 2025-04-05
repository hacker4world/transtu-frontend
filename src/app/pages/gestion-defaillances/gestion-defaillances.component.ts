import { Component } from '@angular/core';
import { AjouterDefaillanceModalComponent } from '../../components/ajouter-defaillance-modal/ajouter-defaillance-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-defaillances',
  standalone: true,
  imports: [AjouterDefaillanceModalComponent, CommonModule],
  templateUrl: './gestion-defaillances.component.html',
  styleUrl: './gestion-defaillances.component.css',
})
export class GestionDefaillancesComponent {
  public showDefaillancesModal = false;

  public toggleDefaillancesModal(open: boolean) {
    this.showDefaillancesModal = open;
  }
}
