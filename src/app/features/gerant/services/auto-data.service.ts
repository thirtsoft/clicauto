// auto-data.service.ts
import { Injectable, signal } from '@angular/core';

export interface Vehicule {
  id: string;
  marque: string;
  modele: string;
  annee: number;
  prix: number;
  statut: 'disponible' | 'vendu' | 'loue' | 'maintenance';
  image?: string;
  kilometrage: number;
  carburant: 'essence' | 'diesel' | 'electrique' | 'hybride';
}

export interface Vente {
  id: string;
  vehiculeId: string;
  client: string;
  montant: number;
  date: Date;
  statut: 'en_attente' | 'confirmée' | 'terminée';
}

export interface Location {
  id: string;
  vehiculeId: string;
  client: string;
  vehicule: string;
  duree: number;
  dateDebut: Date;
  dateFin: Date;
  statut: 'active' | 'terminee' | 'annulee';
}

export interface DashboardData {
  rentedVehicles: number;
  totalVehicles: number;
  returnsToday: number;
  overdueCount: number; // Clients en retard
  monthlyRentalRevenue: number; // Total locations du mois
  vehiclesSold: number;
  lastSale: {
    vehicle: string;
    buyer: string;
    amount: number;
  } | null;
  returnsList: {
    id: string;
    vehicle: string;
    client: string;
    time: string;
    status: 'PENDING' | 'LATE';
  }[];
}

export interface Maintenance {
  id: string;
  vehiculeId: string;
  vehicule: string;
  type: 'entretien' | 'reparation' | 'controle';
  date: Date;
  statut: 'planifiee' | 'en_cours' | 'terminee';
}

@Injectable({ providedIn: 'root' })
export class AutoDataService {

   private _dashboardData = signal<DashboardData | null>(null);
  readonly dashboardData = this._dashboardData.asReadonly();

  constructor() {
    this.loadMockData();
  }

  vehicules = signal<Vehicule[]>([
    { id: '1', marque: 'Toyota', modele: 'Camry', annee: 2023, prix: 45000000, statut: 'disponible', kilometrage: 12000, carburant: 'essence' },
    { id: '2', marque: 'Mercedes', modele: 'Classe E', annee: 2022, prix: 78000000, statut: 'disponible', kilometrage: 8000, carburant: 'diesel' },
    { id: '3', marque: 'Tesla', modele: 'Model 3', annee: 2023, prix: 65000000, statut: 'loue', kilometrage: 5000, carburant: 'electrique' },
    { id: '4', marque: 'Range Rover', modele: 'Evoque', annee: 2021, prix: 55000000, statut: 'vendu', kilometrage: 15000, carburant: 'diesel' },
    { id: '5', marque: 'Hyundai', modele: 'Tucson', annee: 2023, prix: 38000000, statut: 'maintenance', kilometrage: 20000, carburant: 'essence' },
  ]);

  ventes = signal([
    { id: '1', vehiculeId: '4', client: 'Jean Dupont', montant: 55000000, date: new Date('2024-01-15'), statut: 'terminée' },
    { id: '2', vehiculeId: '2', client: 'Marie Diallo', montant: 78000000, date: new Date('2024-02-01'), statut: 'confirmée' },
  ]);

  locations = signal<Location[]>([
    { id: '1', vehiculeId: '3', client: 'Pierre Fall', vehicule: 'Tesla Model 3', duree: 30, dateDebut: new Date('2024-02-01'), dateFin: new Date('2024-03-02'), statut: 'active' },
    { id: '2', vehiculeId: '1', client: 'Aminata Sow', vehicule: 'Toyota Camry', duree: 15, dateDebut: new Date('2024-02-10'), dateFin: new Date('2024-02-25'), statut: 'active' },
  ]);

  maintenances = signal<Maintenance[]>([
    { id: '1', vehiculeId: '5', vehicule: 'Hyundai Tucson', type: 'entretien', date: new Date('2024-02-20'), statut: 'en_cours' },
    { id: '2', vehiculeId: '2', vehicule: 'Mercedes Classe E', type: 'controle', date: new Date('2024-03-01'), statut: 'planifiee' },
  ]);

  ventesParMois = signal([
    { mois: 'Jan', montant: 45000000 },
    { mois: 'Fév', montant: 78000000 },
    { mois: 'Mar', montant: 32000000 },
    { mois: 'Avr', montant: 65000000 },
    { mois: 'Mai', montant: 55000000 },
    { mois: 'Jui', montant: 89000000 },
  ]);

  private loadMockData(): void {
    // Simulation de données (à remplacer plus tard par votre API)
    this._dashboardData.set({
      rentedVehicles: 8,
      totalVehicles: 12,
      returnsToday: 3,
      overdueCount: 3, // Alerte rouge en haut
      monthlyRentalRevenue: 4850000,
      vehiclesSold: 2,
      lastSale: {
        vehicle: 'Ford Everest Titanium 2023',
        buyer: 'SALL & Frères SARL',
        amount: 18500000
      },
      returnsList: [
        { id: '1', vehicle: 'Toyota Land Cruiser Prado', client: 'Mamadou Ndiaye', time: '11:30', status: 'PENDING' },
        { id: '2', vehicle: 'Peugeot 3008 GT Line', client: 'Ibrahima Sow', time: '15:00', status: 'PENDING' },
        { id: '3', vehicle: 'Hyundai Tucson 2024', client: 'Awa Diop', time: '10:00', status: 'LATE' },
      ]
    });
  }
}