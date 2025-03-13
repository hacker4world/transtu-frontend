import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from '../../../services/employees.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../../../services/agent.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  agents: any[] = [];
  searchQuery: string = '';
  showAddModal = false;

  showUpdateModal = false;

  newAgent: any = {
    nom: '',
    prenom: '',
    role: '',
    departement: '',
  };

  roles = ['Chauffeur', 'Receveur'];

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.fetchAgents();
  }

  fetchAgents(): void {
    this.agentService.getAllAgents().subscribe(
      (data) => {
        this.agents = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des agents:', error);
      }
    );
  }

  filteredAgents() {
    return this.agents.filter(
      (agent) =>
        agent.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        agent.prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        agent.role.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        agent.departement.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  removeAgent(matricule: number): void {
    if (confirm('Voulez-vous vraiment supprimer cet agent ?')) {
      this.agentService.removeAgent(matricule).subscribe(
        () => {
          this.agents = this.agents.filter(
            (agent) => agent.matricule !== matricule
          );
          console.log('Agent supprimé avec succès.');
        },
        (error) => {
          console.error('Erreur lors de la suppression de l’agent:', error);
        }
      );
    }
  }

  setShowModifyModal() {
    this.showUpdateModal = true;
  }

  addAgent(): void {
    this.showAddModal = true;
  }
}
