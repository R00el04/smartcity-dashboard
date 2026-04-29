export interface SmartCityEvent {
  eventId: string;
  deviceId: string;
  temperature: number;
  timestamp: string;
  createdAt: string;
  eventDate: string;
  eventHour: string;
  severity: 'normal' | 'alerta' | 'critico';
  zone: string;
}

export interface ApiResponse {
  success: boolean;
  count: number;
  events: SmartCityEvent[];
  filters: {
    deviceId: string | null;
    eventDate: string | null;
    zone: string | null;
    limit: number;
  };
}

export interface EventFilters {
  deviceId?: string;
  eventDate?: string;
  startDate?: string;
  endDate?: string;
  zone?: string;
  limit?: number;
}
