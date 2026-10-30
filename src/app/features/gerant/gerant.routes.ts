
import { Routes } from '@angular/router';
import { MainLayoutAutoComponent } from './components/main-layout-auto-component/main-layout-auto-component';

export const GERANT_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutAutoComponent,
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard-auto-component/dashboard-auto-component')
            .then(m => m.DashboardAutoComponent),
        title: 'Aperçu — Gérant',
      },

        {
        path: 'location',
        loadComponent: () =>
          import('./pages/location/louer-une-voiture-component/louer-une-voiture-component')
            .then(m => m.LouerUneVoitureComponent),
        title: 'Location — Louer',
      },


      // ── Redirection par défaut ────────────────────────
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

