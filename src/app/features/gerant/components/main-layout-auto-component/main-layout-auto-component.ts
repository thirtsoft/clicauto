import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SideBarAutoComponent } from '../side-bar-auto-component/side-bar-auto-component';

interface NavItem {
  route: string;
  ico: string;
  label: string;
}

@Component({
  selector: 'app-main-layout-auto-component',
  standalone: true,
  imports: [RouterOutlet, SideBarAutoComponent, RouterModule],
  templateUrl: './main-layout-auto-component.html',
  styleUrl: './main-layout-auto-component.css',
})
export class MainLayoutAutoComponent {

  sidebarCollapsed = signal(false);
  sidebarOpen = signal(false);
  readonly router = inject(Router);

  nav: NavItem[] = [
    { route: '/auto/dashboard', ico: '📊', label: 'Tableau de bord' },
    { route: '/auto/vehicules', ico: '🚗', label: 'Véhicules' },
    { route: '/auto/ventes', ico: '💰', label: 'Ventes' },
    { route: '/auto/locations', ico: '🔑', label: 'Locations' },
    { route: '/auto/clients', ico: '👤', label: 'Clients' },
    { route: '/auto/stocks', ico: '📦', label: 'Stock' },
    { route: '/auto/maintenance', ico: '🔧', label: 'Maintenance' },
    { route: '/auto/personnels', ico: '👥', label: 'Personnel' },
    { route: '/auto/finances', ico: '💼', label: 'Finances' },
  ];

  dateAuj = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  get sectionLabel(): string {
    const url = this.router.url;
    const map: Record<string, string> = {
      dashboard: 'Tableau de bord',
      vehicules: 'Véhicules',
      ventes: 'Ventes',
      locations: 'Locations',
      clients: 'Clients',
      stocks: 'Stock',
      maintenance: 'Maintenance',
      personnels: 'Personnel',
      finances: 'Finances',
    };
    const key = url.split('/').pop() || '';
    return map[key] || 'AutoSaaS';
  }

  isActive(route: string): boolean {
    const segment = route.split('/').pop() ?? '';
    return this.router.url.includes(segment);
  }

  naviguer(route: string): void {
    this.router.navigate([route]);
    this.sidebarOpen.set(false);
  }

  onToggleCollapse(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  onSidebarClose(): void {
    this.sidebarOpen.set(false);
  }
}

