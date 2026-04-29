import { EventFilters, ApiResponse } from '../../core/entities/event.entity';
import { IEventRepository } from '../../core/repositories/event.repository';

/**
 * Caso de Uso: Obtener Eventos
 * Los casos de uso contienen la lógica de negocio específica de una acción.
 * Siguen el principio de responsabilidad única (SRP).
 */
export class GetEventsUseCase {
  constructor(private eventRepository: IEventRepository) {}

  /**
   * Ejecuta la lógica para obtener eventos filtrados.
   */
  async execute(filters?: EventFilters): Promise<ApiResponse> {
    return await this.eventRepository.getEvents(filters);
  }
}
