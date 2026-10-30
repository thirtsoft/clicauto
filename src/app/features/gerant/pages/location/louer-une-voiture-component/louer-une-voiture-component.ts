import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutoDataService } from '../../../services/auto-data.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-louer-une-voiture-component',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './louer-une-voiture-component.html',
  styleUrl: './louer-une-voiture-component.css',
})
export class LouerUneVoitureComponent {

  public readonly router = inject(Router);
  private readonly autoService = inject(AutoDataService);

  window: any;

  clientsExistants = signal([
    { id: 1, nom: 'Mamadou Ndiaye', tel: '771234567', adresse: 'Dakar', permis: 'PCN-12345' },
    { id: 2, nom: 'Awa Diop', tel: '781234567', adresse: 'Rufisque', permis: 'PCN-67890' },
    { id: 3, nom: 'Ibrahima Sow', tel: '781020304', adresse: 'Thiès', permis: 'PCN-11223' }
  ]);


  // Données du formulaire (Signals)
  formData = signal({
    client: { nom: '', adresse: '', tel: '', pc: '', dateNaissance: '', autres: '' },
    vehicule: { marque: '', immatriculation: '', kmRetour: '', typeCarburant: '', kmDepart: '' },
    location: { dateDepart: '', heureDepart: '', dateRetour: '', heureRetour: '', nombreJours: 0, prixJour: 0, kmTotal: 0, prixKm: 0, kmCharge: 0 },
    facturation: { prixTSP: 0, societe: '', assPertes: '', chauffeur: '', carburant: 0, rembourser: 0, deduction: 0 },
    paiement: { mode: 'Espece', depot: '', empreinte: '' },
    observations: '',
    accepte: false
  });


  vehiculesDisponibles = signal([
    { id: 1, marque: 'Toyota Land Cruiser', immat: 'DK-24679-A', carburant: 'Diesel', prixJour: 45000, kmActuel: 12500 },
    { id: 2, marque: 'Peugeot 3008', immat: 'DK-89312-B', carburant: 'Essence', prixJour: 35000, kmActuel: 8400 },
    { id: 3, marque: 'Hyundai Tucson', immat: 'DK-10293-C', carburant: 'Diesel', prixJour: 40000, kmActuel: 15200 },
    { id: 4, marque: 'Renault Duster', immat: 'DK-55441-D', carburant: 'Diesel', prixJour: 30000, kmActuel: 22000 }
  ]);

  // ===== SIGNAUX DE RECHERCHE =====
  rechercheClient = signal('');
  rechercheVehicule = signal('');

  // ===== SÉLECTIONS =====
  clientSelectionne = signal<any | null>(null);
  estNouveauClient = signal(false);

  vehiculeSelectionne = signal<any | null>(null);

  // ===== CHAMPS LOCATION =====
  dateDepart = signal('');
  heureDepart = signal('');
  dateRetour = signal('');
  heureRetour = signal('');
  kmRetour = signal<number | null>(null);
  depotGarantie = signal<number | null>(null);
  modePaiement = signal('Espece');
  observations = signal('');

  // ===== FILTRES DYNAMIQUES (Computed) =====
  // Résultats de recherche Client (basés sur le téléphone ou le nom)
  filteredClients = computed(() => {
    const query = this.rechercheClient().toLowerCase().trim();
    if (!query) return [];
    return this.clientsExistants().filter(c =>
      c.nom.toLowerCase().includes(query) || c.tel.includes(query)
    );
  });

  // Résultats de recherche Véhicule (basés sur la marque ou l'immat)
  filteredVehicles = computed(() => {
    const query = this.rechercheVehicule().toLowerCase().trim();
    if (!query) return [];
    return this.vehiculesDisponibles().filter(v =>
      v.marque.toLowerCase().includes(query) || v.immat.toLowerCase().includes(query)
    );
  });

  // ===== CALCULS AUTOMATIQUES =====
  nbJours = computed(() => {
    if (!this.dateDepart() || !this.dateRetour()) return 0;
    const d1 = new Date(`${this.dateDepart()}T${this.heureDepart() || '00:00'}`);
    const d2 = new Date(`${this.dateRetour()}T${this.heureRetour() || '00:00'}`);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  });

  prixTemps = computed(() => {
    if (!this.vehiculeSelectionne()) return 0;
    return this.nbJours() * this.vehiculeSelectionne().prixJour;
  });

  totalKm = computed(() => {
    if (!this.vehiculeSelectionne() || !this.kmRetour()) return 0;
    const kmParcourus = this.kmRetour()! - this.vehiculeSelectionne().kmActuel;
    return kmParcourus > 0 ? kmParcourus : 0;
  });

  totalAPayer = computed(() => {
    if (!this.vehiculeSelectionne()) return 0;
    const kmCost = this.totalKm() * 100; // Ex: 100 FCFA / km
    const taxes = Math.round(this.prixTemps() * 0.18); // TVA 18%
    return this.prixTemps() + kmCost + taxes;
  });

  // ===== MÉTHODES =====
  selectClient(c: any) {
    this.clientSelectionne.set(c);
    this.rechercheClient.set('');
    this.estNouveauClient.set(false);
  }

  selectVehicle(v: any) {
    this.vehiculeSelectionne.set(v);
    this.rechercheVehicule.set('');
  }

  activerNouveauClient() {
    this.estNouveauClient.set(true);
    this.clientSelectionne.set(null);
    this.rechercheClient.set('');
  }

  enregistrer() {
    console.log('Contrat enregistré', {
      client: this.clientSelectionne(),
      vehicule: this.vehiculeSelectionne(),
      dates: { depart: this.dateDepart(), retour: this.dateRetour() },
      km: this.kmRetour(),
      total: this.totalAPayer(),
      paiement: this.modePaiement()
    });
    this.router.navigate(['/auto/locations']);
  }

  // Calculs automatiques pour les totaux
  totalHorsTaxe = signal(0);
  totalGouv = signal(0);
  netAPayer = signal(0);

  // Sauvegarder le contrat
  saveContract() {
    console.log('Contrat enregistré :', this.formData());
    this.router.navigate(['/auto/locations']);
  }
}
