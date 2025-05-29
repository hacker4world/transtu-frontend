import { Component, OnInit } from '@angular/core';
import { RetardService } from '../../services/retard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-retards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './retards.component.html',
  styleUrl: './retards.component.css',
})
export class RetardsComponent implements OnInit {
  public retards: any[] = [];

  constructor(private readonly retardService: RetardService) {}

  ngOnInit(): void {
    this.retardService.getAllRetards().subscribe({
      next: (response: any) => {
        console.log(response);

        this.retards = response.data;
      },
    });
  }
}
