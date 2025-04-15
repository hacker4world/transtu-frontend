import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gestion-tourservice-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gestion-tourservice-modal.component.html',
  styleUrl: './gestion-tourservice-modal.component.css',
})
export class GestionTourserviceModalComponent {
  @Output() modalClose = new EventEmitter();

  public activeTab: 'tour' | 'agents' = 'tour';

  public closeModal() {
    this.modalClose.emit();
  }

  public changeTab(tab: 'tour' | 'agents') {
    this.activeTab = tab;
  }
}
