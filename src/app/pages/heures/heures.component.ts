import { Component } from '@angular/core';
import { HeuresModalComponent } from "../../components/heures-modal/heures-modal.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heures',
  standalone: true,
  imports: [HeuresModalComponent, CommonModule],
  templateUrl: './heures.component.html',
  styleUrl: './heures.component.css'
})
export class HeuresComponent {

  public data = {
    heures_jour: 0,
    heures_nuit: 0,
    jours_absences: 0,
    jours_defaillances: 0,
    jours_conges: 0,
    agentName: ""
  }

  public modal = false;

  public setModal(open: boolean) {
    this.modal = open;
  }

  public setData(data: any) {
    this.data = data;
    this.setModal(false);
  }

}
