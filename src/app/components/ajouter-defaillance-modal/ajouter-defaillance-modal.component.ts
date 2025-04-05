import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ajouter-defaillance-modal',
  standalone: true,
  imports: [],
  templateUrl: './ajouter-defaillance-modal.component.html',
  styleUrl: './ajouter-defaillance-modal.component.css',
})
export class AjouterDefaillanceModalComponent {
  @Output() public modalClose = new EventEmitter();

  public closeModal() {
    this.modalClose.emit();
  }
}
