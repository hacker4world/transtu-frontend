import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modifier-defaillance',
  standalone: true,
  imports: [],
  templateUrl: './modifier-defaillance.component.html',
  styleUrl: './modifier-defaillance.component.css'
})
export class ModifierDefaillanceComponent {

  @Output() public modalClose = new EventEmitter();
  
    public closeModal() {
      this.modalClose.emit();
    }

}
