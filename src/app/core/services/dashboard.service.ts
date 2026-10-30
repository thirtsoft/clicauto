import { computed, Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DashboardMetrics, UpcomingReturn } from '../models/dashboard/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly _metrics = signal<DashboardMetrics | null>(null);
  private readonly _upcomingReturns = signal<UpcomingReturn[]>([]);
  private readonly _isLoading = signal<boolean>(false);

  readonly metrics = this._metrics.asReadonly();
  readonly upcomingReturns = this._upcomingReturns.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  readonly fleetOccupancyRate = computed(() => {
    const data = this._metrics();
    if (!data || data.totalVehicles === 0) return 0;
    return Math.round((data.rentedVehicles / data.totalVehicles) * 100);
  });

  loadDashboardData(): void {
    this._isLoading.set(true);

    // En typant la réponse attendue { metrics: DashboardMetrics; returns: UpcomingReturn[] }, 
    // TypeScript valide automatiquement le statut !
    of<{ metrics: DashboardMetrics; returns: UpcomingReturn[] }>({
      metrics: {
        rentedVehicles: 8,
        totalVehicles: 12,
        returnsTodayCount: 3,
        monthlyRevenue: 4850000,
        salesThisMonthCount: 2,
        activeContractsCount: 14
      },
      returns: [
        {
          id: '1',
          contractNumber: 'CTR-2026-00451',
          clientName: 'Mamadou Ndiaye',
          clientPhone: '+221 77 634 21 10',
          vehiclePlate: 'DK-24679-A',
          vehicleModel: 'Toyota Land Cruiser Prado',
          returnTime: '11:30',
          status: 'PENDING'
        },
        {
          id: '2',
          contractNumber: 'CTR-2026-00452',
          clientName: 'Ibrahima Sow',
          clientPhone: '+221 78 102 33 44',
          vehiclePlate: 'DK-89312-B',
          vehicleModel: 'Peugeot 3008 GT Line',
          returnTime: '15:00',
          status: 'PENDING'
        },
        {
          id: '3',
          contractNumber: 'CTR-2026-00449',
          clientName: 'Awa Diop',
          clientPhone: '+221 70 982 11 00',
          vehiclePlate: 'DK-10293-C',
          vehicleModel: 'Hyundai Tucson 2024',
          returnTime: '10:00',
          status: 'LATE'
        }
      ]
    }).pipe(
      delay(400)
    ).subscribe({
      next: (res) => {
        this._metrics.set(res.metrics);
        this._upcomingReturns.set(res.returns); // Plus d'erreur TS !
        this._isLoading.set(false);
      },
      error: () => this._isLoading.set(false)
    });
  }
}