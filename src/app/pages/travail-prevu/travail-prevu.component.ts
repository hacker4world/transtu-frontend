import { Component, OnInit } from '@angular/core';
import { TourServiceResponse } from '../../models/TourServiceResponse.model';
import { TourServiceService } from '../../services/tour-service.service';
import { CommonModule } from '@angular/common';
import { WarningComponent } from '../../components/warning/warning.component';

@Component({
  selector: 'app-travail-prevu',
  standalone: true,
  imports: [CommonModule, WarningComponent],
  templateUrl: './travail-prevu.component.html',
  styleUrl: './travail-prevu.component.css',
})
export class TravailPrevuComponent implements OnInit {
  public toursServices: TourServiceResponse[] = [];
  public tomorrowDate: string = '';

  public error = {
    message: '',
    show: false,
  };

  constructor(private readonly tourServiceService: TourServiceService) {}

  ngOnInit(): void {
    this.tomorrowDate = this.getTomorrow();
    console.log(this.tomorrowDate);

    this.tourServiceService.getToursByDate(this.tomorrowDate).subscribe({
      next: (response) => {
        this.toursServices = response;
      },
    });
  }

  public genererTravailPrevu() {
    this.tourServiceService.genererTravailPrevu().subscribe({
      next: (response) => {
        this.toursServices = response;
      },
    });
  }

  private getTomorrow() {
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const day = tomorrow.getDate().toString().padStart(2, '0');
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const year = tomorrow.getFullYear();

    return `${day}-${month}-${year}`;
  }
}
