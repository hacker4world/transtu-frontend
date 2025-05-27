import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CongeService } from '../../services/conge.service';

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
  @Output() congeUpdated = new EventEmitter();

  constructor(private readonly congeService: CongeService) {}

  public onClose() {
    this.modalClose.emit();
  }

  public onUpdate() {
    console.log(this.congeData);
    this.congeService.updateConge(this.congeData)
      .subscribe({
        next: () => {
          this.congeUpdated.emit(this.congeData);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

}
