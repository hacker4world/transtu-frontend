import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-confirm-modal.component.html',
  styleUrl: './delete-confirm-modal.component.css',
})
export class DeleteConfirmModalComponent {
  @Input() message: string = '';

  @Output() onClose = new EventEmitter();
  @Output() onConfirm = new EventEmitter();

  public close() {
    this.onClose.emit();
  }

  public confirm() {
    this.onConfirm.emit();
  }
}
