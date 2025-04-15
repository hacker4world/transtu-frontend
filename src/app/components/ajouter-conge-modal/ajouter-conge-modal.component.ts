import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ajouter-conge-modal',
  standalone: true,
  imports: [],
  templateUrl: './ajouter-conge-modal.component.html',
  styleUrl: './ajouter-conge-modal.component.css'
})
export class AjouterCongeModalComponent {
  @Output() modalClose = new EventEmitter();

  public onClose() {
    this.modalClose.emit();
  }

}
