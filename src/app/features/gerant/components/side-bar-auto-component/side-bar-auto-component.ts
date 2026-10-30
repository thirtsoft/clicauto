import { Component, inject, input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface NavItem {
  route: string;
  ico: string;
  label: string;
}

@Component({
  selector: 'app-side-bar-auto-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-bar-auto-component.html',
  styleUrl: './side-bar-auto-component.css',
})
export class SideBarAutoComponent {

  collapsed = input<boolean>(false);
  open = input<boolean>(false);
  toggleCollapse = output<void>();
  close = output<void>();
  readonly router = inject(Router);

  nav: NavItem[] = [
    { route: '/gerant/dashboard', ico: '📊', label: 'Tableau de bord' },
    { route: '/gerant/vehicules', ico: '🚗', label: 'Véhicules' },
    { route: '/gerant/ventes', ico: '💰', label: 'Ventes' },
    { route: '/gerant/locations', ico: '🔑', label: 'Locations' },
    { route: '/gerant/clients', ico: '👤', label: 'Clients' },
    //    { route: '/gerant/stocks', ico: '📦', label: 'Stock' },
    { route: '/gerant/maintenance', ico: '🔧', label: 'Maintenance' },
    { route: '/gerant/personnels', ico: '👥', label: 'Personnel' },
    { route: '/gerant/finances', ico: '💼', label: 'Finances' },
  ];

  isActive(route: string): boolean {
    const segment = route.split('/').pop() ?? '';
    return this.router.url.includes(segment);
  }

  naviguer(route: string): void {
    this.router.navigate([route]);
    this.close.emit();
  }

  handleToggleClick(): void {
    if (window.innerWidth <= 768) {
      // Si on est sur mobile, on ferme le drawer
      this.close.emit();
    } else {
      // Si on est sur desktop, on réduit/étend la sidebar
      this.toggleCollapse.emit();
    }
  }

  deconnecter(): void {
    this.router.navigate(['/auth/login']);
  }

}
