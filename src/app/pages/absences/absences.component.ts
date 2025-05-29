import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../../services/absence.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.css',
})
export class AbsencesComponent implements OnInit {
  public absences: any[] = [];

  constructor(private readonly absenceService: AbsenceService) {}

  ngOnInit(): void {
    this.absenceService.getAllAbsences().subscribe({
      next: (response: any) => {
        this.absences = response.data;
        console.log(response);
      },
    });
  }
}
