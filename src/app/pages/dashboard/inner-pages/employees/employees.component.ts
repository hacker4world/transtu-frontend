import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../../../services/agent.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {

affaddAgent() {
  this.showAddModal = true;
}
  agents: any[] = [];
  searchQuery: string = '';
  showAddModal = false;
  showUpdateModal = false;

  newAgent = {
    matricule:0,
    nom: '',
    prenom: '',
    date_naiss: '',
    situation_familiale: '',
    code_emploi_assure: '',
    code_grade: '',
    role: '',
    departement: '',
  };

  updatedAgent = {
    
    nom: '',
    prenom: '',
    date_naiss: '',
    situation_familiale: '',
    code_emploi_assure: '',
    code_grade: '',
    role: '',
    departement: '',
  };

  roles = ['Chauffeur', 'Receveur'];
  agentId!: number;

  constructor(
    private agentService: AgentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.fetchAgents();
    
  }
  getAgentById(id: number): void {
    this.showUpdateModal = true;
    this.agentService.getAgentById(id).subscribe(
      (data) => {
        this.newAgent = data;
        
      },
      (error) => {
        console.error('Error fetching agent data:', error);
      }
    );
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
        agent.departement.toLowerCase().includes(this.searchQuery.toLowerCase())||
        agent.matricule.toLowerCase().includes(this.searchQuery.toLowerCase())
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


  addAgent(matricule: number): void {
    

    this.agentService.addAgent(this.newAgent).subscribe(
      (response) => {
        console.log('Agent ajouté avec succès :', response);
    
        this.showAddModal = false;
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'agent:', error);
      }
    );
  }

  updateAgent(agentId: number): void {
    console.log(agentId);
    console.log(this.newAgent)
    
    this.agentService.updateAgent(agentId, this.newAgent).subscribe(
      (response) => {
        console.log('Agent updated successfully:', response);
        this.showUpdateModal = false;
      },
      (error) => {
        console.error('Error updating agent:', error);
      }
    );
  }
}
