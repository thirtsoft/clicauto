import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  companyName = signal<string>('Transcar Via Senegal');

 
}