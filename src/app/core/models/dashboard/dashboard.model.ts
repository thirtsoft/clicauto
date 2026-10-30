export type RentalReturnStatus = 'PENDING' | 'LATE' | 'COMPLETED' | 'CANCELLED';

export interface DashboardMetrics {
  rentedVehicles: number;
  totalVehicles: number;
  returnsTodayCount: number;
  monthlyRevenue: number;
  salesThisMonthCount: number;
  activeContractsCount: number;
}

export interface UpcomingReturn {
  id: string;
  contractNumber: string;
  clientName: string;
  clientPhone: string;
  vehiclePlate: string;
  vehicleModel: string;
  returnTime: string;
  status: RentalReturnStatus;
}