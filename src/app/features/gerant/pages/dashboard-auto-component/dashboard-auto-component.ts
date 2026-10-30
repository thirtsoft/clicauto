
import { Component, computed, inject } from '@angular/core';
import { AutoDataService } from '../../services/auto-data.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-auto-component',
  standalone: true,
  imports: [RouterLink, DecimalPipe, CommonModule],
  templateUrl: './dashboard-auto-component.html',
  styleUrl: './dashboard-auto-component.css',
})
export class DashboardAutoComponent {

  private ds = inject(AutoDataService);
   readonly dataService = inject(AutoDataService);
  public router = inject(Router);

  vehiculesEnStock = computed(() =>
    this.ds.vehicules().filter(v => v.statut === 'disponible').length
  );

  ventesMois = computed(() =>
    this.ds.ventes().reduce((s, v) => s + v.montant, 0)
  );

  locationsActives = computed(() =>
    this.ds.locations().filter(l => l.statut === 'active').length
  );

  maintenanceEnCours = computed(() =>
    this.ds.maintenances().filter(m => m.statut === 'en_cours').length
  );

  kpis = computed(() => [
    {
      label: 'Véhicules en stock',
      val: `${this.vehiculesEnStock()}/${this.ds.vehicules().length}`,
      ico: '🚗',
      var: +5,
      cls: 'blue'
    },
    {
      label: 'Ventes du mois',
      val: this.fmtCFA(this.ventesMois()),
      ico: '💰',
      var: +12,
      cls: 'green'
    },
    {
      label: 'Locations actives',
      val: `${this.locationsActives()}`,
      ico: '🔑',
      var: +8,
      cls: 'gold'
    },
    {
      label: 'Maintenance en cours',
      val: `${this.maintenanceEnCours()}`,
      ico: '🔧',
      var: -3,
      cls: 'red'
    },
  ]);

   getStatusClass(status: string): string {
    return status === 'LATE' ? 'status-late' : 'status-pending';
  }

  get vehicules() {
    return this.ds.vehicules();
  }

  get ventes() {
    return this.ds.ventes();
  }

  get locations() {
    return this.ds.locations();
  }

  get maintenances() {
    return this.ds.maintenances();
  }

  get ventesParMois() {
    return this.ds.ventesParMois();
  }

  topVentes(): number {
    const data = this.ds.ventesParMois();
    if (data.length === 0) return 1;
    return Math.max(...data.map(v => v.montant));
  }

  barHeight(ventes: number): number {
    const max = this.topVentes();
    return max > 0 ? Math.round((ventes / max) * 100) : 0;
  }

  fmtCFA(n: number): string {
    return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';
  }

  statutLoc(loc: any): { label: string; cls: string } {
    const map: Record<string, { label: string; cls: string }> = {
      active: { label: 'Active', cls: 'success' },
      terminee: { label: 'Terminée', cls: 'info' },
      annulee: { label: 'Annulée', cls: 'danger' },
    };
    return map[loc.statut] || { label: loc.statut, cls: 'info' };
  }

  statutMaintenance(maintenance: any): { label: string; cls: string } {
    const map: Record<string, { label: string; cls: string }> = {
      planifiee: { label: 'Planifiée', cls: 'info' },
      en_cours: { label: 'En cours', cls: 'warning' },
      terminee: { label: 'Terminée', cls: 'success' },
    };
    return map[maintenance.statut] || { label: maintenance.statut, cls: 'info' };
  }

  naviguer(route: string): void {
    this.router.navigate([route]);
  }
  
}