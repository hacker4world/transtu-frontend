import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css',
})
export class WarningComponent {
  @Input() public message: string = '';
}
