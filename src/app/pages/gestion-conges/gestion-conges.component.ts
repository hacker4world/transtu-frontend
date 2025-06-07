import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AjouterCongeModalComponent } from '../../components/ajouter-conge-modal/ajouter-conge-modal.component';
import { ModifierCongeComponent } from '../../components/modifier-conge/modifier-conge.component';
import { CongeService } from '../../services/conge.service';
import { DeleteConfirmModalComponent } from '../../components/delete-confirm-modal/delete-confirm-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-conges',
  standalone: true,
  imports: [
    CommonModule,
    AjouterCongeModalComponent,
    ModifierCongeComponent,
    DeleteConfirmModalComponent,
    FormsModule,
  ],
  templateUrl: './gestion-conges.component.html',
  styleUrl: './gestion-conges.component.css',
})
export class GestionCongesComponent implements OnInit {
  public searchInput = '';

  public allConges: any[] = [];

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
        this.allConges = response.data;
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
    this.allConges.push(data);
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
        this.allConges = this.allConges.filter(
          (c) => c.id !== this.congeToDelete.id
        );
        this.conges = this.conges.filter((c) => c.id !== this.congeToDelete.id);
        this.closeDeleteConfirmation();
      },
    });

    this.showDeleteConfirmation = false;
  }

  updateConge(congeData: any) {
    this.allConges = this.conges.map((c) => {
      if (c.id === congeData.id) return { ...congeData };
      else return c;
    });
  }

  public onSearch() {
    if (this.searchInput.trim() == '') {
      this.conges = this.allConges;
    } else {
      let numeric = this.isNumeric(this.searchInput.trim());
      if (numeric)
        this.conges = this.allConges.filter(
          (conge) => conge.agentId == Number(this.searchInput)
        );
      else {
        this.conges = this.allConges.filter((conge) => {
          return conge.agentName
            .toLowerCase()
            .includes(this.searchInput.trim().toLowerCase());
        });
      }
    }
  }

  public isNumeric(searchInput: string) {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < searchInput.length; i++) {
      if (!numbers.includes(searchInput[i])) {
        return false;
      }
    }
    return true;
  }
}
