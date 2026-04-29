import { apiClient } from '../api/api-client';
import { ApiResponse, EventFilters } from '../../core/entities/event.entity';
import { IEventRepository } from '../../core/repositories/event.repository';

/**
 * Implementación del repositorio usando una API externa.
 */
export class ApiEventRepository implements IEventRepository {
  async getEvents(filters?: EventFilters): Promise<ApiResponse> {
    try {
      // Excluir startDate y endDate del request (filtrado local)
      const { ...apiFilters } = filters || {};
      const response = await apiClient.get<ApiResponse>('/', {
        params: apiFilters,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error('Error al conectar con el servidor de la Smart City');
    }
  }
}
