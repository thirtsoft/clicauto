import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { DashboardService } from '../../../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-overview.component.html',
  styleUrl: './dashboard-overview.component.scss'
})
export class DashboardOverviewComponent implements OnInit {
  protected readonly dashboardService = inject(DashboardService);

  ngOnInit(): void {
    this.dashboardService.loadDashboardData();
  }

  getOccupancyColorClass(rate: number): string {
    if (rate >= 80) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (rate >= 50) return 'bg-blue-50 text-blue-700 border-blue-200';
    return 'bg-amber-50 text-amber-700 border-amber-200';
  }
}