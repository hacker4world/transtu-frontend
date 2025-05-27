import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AjouterCongeModalComponent } from '../../components/ajouter-conge-modal/ajouter-conge-modal.component';
import { ModifierCongeComponent } from '../../components/modifier-conge/modifier-conge.component';
import { CongeService } from '../../services/conge.service';
import { DeleteConfirmModalComponent } from '../../components/delete-confirm-modal/delete-confirm-modal.component';

@Component({
  selector: 'app-gestion-conges',
  standalone: true,
  imports: [
    CommonModule,
    AjouterCongeModalComponent,
    ModifierCongeComponent,
    DeleteConfirmModalComponent,
  ],
  templateUrl: './gestion-conges.component.html',
  styleUrl: './gestion-conges.component.css',
})
export class GestionCongesComponent implements OnInit {
  public conges: any[] = [];

  public showAddCongeModal: boolean = false;
  public showModifierCongeModal: boolean = false;
  public congeToUpdate: any = null;
  public congeToDelete: any = null;
  public showDeleteConfirmation = false;

  constructor(private readonly congeService: CongeService) {}

  ngOnInit(): void {
    this.congeService.getAllConges().subscribe({
      next: (response: any) => {
        this.conges = response.data;
      },
    });
  }

  public setShowAddCongeModal(value: boolean) {
    this.showAddCongeModal = value;
  }

  public setShowModifierCongeModal(value: boolean) {
    this.showModifierCongeModal = value;
  }

  public creerConge(data: any) {
    this.conges.push(data);
    this.setShowAddCongeModal(false);
  }

  public setCongeToDelete(id: any) {
    this.congeToDelete = this.conges.find((c) => c.id === id);
    this.showDeleteConfirmation = true;
  }

  public setCongeToUpdate(id: any) {
    this.congeToUpdate = this.conges.find((c) => c.id === id);
    this.showModifierCongeModal = true;
  }

  public closeDeleteConfirmation() {
    this.showDeleteConfirmation = false;
  }

  deleteConge() {
    this.congeService.deleteConge(this.congeToDelete.id).subscribe({
      next: () => {
        this.conges = this.conges.filter((c) => c.id !== this.congeToDelete.id);
        this.closeDeleteConfirmation();
      },
    });

    this.showDeleteConfirmation = false;
  }

  updateConge(congeData: any) {
    this.conges = this.conges.map(c => {
      if (c.id === congeData.id) return {...congeData}
      else return c;
    })
  }
}
