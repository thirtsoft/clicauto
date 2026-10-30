// features/dashboard/dashboard.routes.ts
import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard-overview/dashboard-overview.component').then(
        (m) => m.DashboardOverviewComponent
      ),
    data: { animation: 'DashboardOverview' }
  }
];