'use client';

import React from 'react';
import { EventFilters } from '../../core/entities/event.entity';
import { Card } from './Card';
import { HiOutlineMap, HiOutlineDesktopComputer } from 'react-icons/hi';
import { MdOutlineDateRange } from 'react-icons/md';

interface FiltersProps {
  filters: EventFilters;
  onFilterChange: (newFilters: EventFilters) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'limit' ? (value ? Number(value) : undefined) : (value || undefined);
    onFilterChange({ [name]: parsedValue });
  };

  return (
    <Card className="mb-8">
      <div className="flex flex-col lg:flex-row gap-6 items-end">
        {/* Dispositivo */}
        <div className="flex-1 w-full">
          <label className="flex text-sm font-medium text-gray-500 mb-2 items-center gap-2">
            <HiOutlineDesktopComputer size={16} /> ID del Dispositivo
          </label>
          <input
            type="text"
            name="deviceId"
            value={filters.deviceId || ''}
            onChange={handleChange}
            placeholder="Ej: A1, B2..."
            className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
          />
        </div>

        {/* Zona */}
        <div className="flex-1 w-full">
          <label className="flex text-sm font-medium text-gray-500 mb-2 items-center gap-2">
            <HiOutlineMap size={16} /> Zona
          </label>
          <select
            name="zone"
            value={filters.zone || ''}
            onChange={handleChange}
            className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none appearance-none"
          >
            <option value="">Todas las zonas</option>
            <option value="Centro">Centro</option>
            <option value="Norte">Norte</option>
            <option value="Sur">Sur</option>
            <option value="Este">Este</option>
            <option value="Oeste">Oeste</option>
          </select>
        </div>

        {/* Límite de Resultados */}
        <div className="flex-1 w-full">
          <label className="flex text-sm font-medium text-gray-500 mb-2 items-center gap-2">
            Límite
          </label>
          <input
            type="number"
            name="limit"
            value={filters.limit ?? ''}
            onChange={handleChange}
            min={1}
            placeholder="50"
            className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
          />
        </div>

        {/* Rango de Fechas */}
        <div className="flex-1 w-full">
          <label className="flex text-sm font-medium text-gray-500 mb-2 items-center gap-2">
             <MdOutlineDateRange size={16} /> Rango de Fechas
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-2">Desde</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate || ''}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2">Hasta</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate || ''}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
