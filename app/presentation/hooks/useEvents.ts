import { useState, useEffect, useEffectEvent, useCallback, useMemo } from 'react';
import { SmartCityEvent, EventFilters } from '../../core/entities/event.entity';
import { ApiEventRepository } from '../../infrastructure/repositories/api-event.repository';
import { GetEventsUseCase } from '../../application/use-cases/get-events.use-case';

/**
 * Hook para gestionar la lógica de eventos en la UI.
 * Actúa como un presentador (Controller/ViewModel).
 */
export const useEvents = (initialFilters: EventFilters = {}) => {
  const [events, setEvents] = useState<SmartCityEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFilters>(initialFilters);

  const useCase = useMemo(() => {
    const repository = new ApiEventRepository();
    return new GetEventsUseCase(repository);
  }, []);

  const applyLocalFilters = useCallback((rawEvents: SmartCityEvent[], currentFilters: EventFilters): SmartCityEvent[] => {
    let filtered = rawEvents;

    // Filtro por startDate
    if (currentFilters.startDate) {
      const startDate = new Date(currentFilters.startDate);
      filtered = filtered.filter((event) => new Date(event.timestamp) >= startDate);
    }

    // Filtro por endDate
    if (currentFilters.endDate) {
      const endDate = new Date(currentFilters.endDate);
      endDate.setHours(23, 59, 59, 999); // Incluir todo el día
      filtered = filtered.filter((event) => new Date(event.timestamp) <= endDate);
    }

    return filtered;
  }, []);

  const fetchEvents = useCallback(async (currentFilters: EventFilters) => {
  setLoading(true);
  try {
    const data = await useCase.execute(currentFilters);
    const localFiltered = applyLocalFilters(data.events, currentFilters);
    setEvents(localFiltered);
    setError(null);
  } catch (error) {
    console.error('Error fetching events:', error);
    setError('Error cargando los datos de la ciudad');
  } finally {
    setLoading(false);
  }
}, [useCase, applyLocalFilters]);

const fetchEventsStable = useEffectEvent(fetchEvents);  // ← ESTABILIZA

useEffect(() => {
  fetchEventsStable(filters);
}, [filters]);

const updateFilters = (newFilters: EventFilters) => {
  setFilters((prev) => ({ ...prev, ...newFilters }));
};

  return { 
    events, 
    loading, 
    error, 
    filters, 
    updateFilters, 
    refresh: () => fetchEvents(filters) 
  };
};
