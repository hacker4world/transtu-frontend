import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modifier-conge',
  standalone: true,
  imports: [],
  templateUrl: './modifier-conge.component.html',
  styleUrl: './modifier-conge.component.css',
})
export class ModifierCongeComponent {
  @Output() modalClose = new EventEmitter();

  public onClose() {
    this.modalClose.emit();
  }
}
