import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GestionTourserviceModalComponent } from "../../components/gestion-tourservice-modal/gestion-tourservice-modal.component";

@Component({
  selector: 'app-gestion-tours-services',
  standalone: true,
  imports: [CommonModule, GestionTourserviceModalComponent],
  templateUrl: './gestion-tours-services.component.html',
  styleUrl: './gestion-tours-services.component.css',
})
export class GestionToursServicesComponent {
  public showUpdateModal = false;

  public toggleUpdateModal(open: boolean) {
    this.showUpdateModal = open;
  }
}
