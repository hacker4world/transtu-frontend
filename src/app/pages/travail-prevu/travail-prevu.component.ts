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
  public targetDate = {
    day: 0,
    month: 0,
    year: 0,
    dayCode: 0,
  };

  public userEmail = '';

  public error = {
    message: '',
    show: false,
  };

  constructor(private readonly tourServiceService: TourServiceService) {}

  ngOnInit(): void {
    this.targetDate = this.getTomorrowDate();

    let user = JSON.parse(localStorage.getItem('user')!);

    this.userEmail = user.email;
  }

  public genererPrevu() {
    this.tourServiceService.genererTravailPrevu({
      ...this.targetDate,
      email: this.userEmail,
    })
    .subscribe({
      next: (response) => {
        this.toursServices = response;
      }
    })
  }

  private getTomorrowDate() {
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const day = tomorrow.getDate();
    const month = tomorrow.getMonth() + 1;
    const year = tomorrow.getFullYear();

    let dayCode = tomorrow.getDay();
    dayCode = dayCode === 0 ? 7 : dayCode;

    return {
      day,
      month,
      year,
      dayCode,
    };
  }
}
