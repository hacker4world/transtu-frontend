import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modifier-conge',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modifier-conge.component.html',
  styleUrl: './modifier-conge.component.css',
})
export class ModifierCongeComponent {
  @Input() congeData: any = null;
  @Output() modalClose = new EventEmitter();

  public onClose() {
    this.modalClose.emit();
  }
}
