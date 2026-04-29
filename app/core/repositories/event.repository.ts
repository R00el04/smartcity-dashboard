import { ApiResponse, EventFilters } from '../entities/event.entity';

/**
 * Interfaz del Repositorio de Eventos.
 * Define qué acciones se pueden hacer con los datos, sin importar de dónde vengan.
 */
export interface IEventRepository {
  getEvents(filters?: EventFilters): Promise<ApiResponse>;
}
