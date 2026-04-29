'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SmartCityEvent } from '../../core/entities/event.entity';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TemperatureChartProps {
  events: SmartCityEvent[];
  visibleSeverities?: Set<string>;
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ events, visibleSeverities }) => {
  const filteredEvents = visibleSeverities
    ? events.filter((event) => visibleSeverities.has(event.severity))
    : events;
  const sortedEvents = [...filteredEvents].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  if (filteredEvents.length === 0) {
    return (
      <div className="h-75 w-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-lg font-medium">Sin datos</p>
          <p className="text-sm">No hay eventos que mostrar con los filtros seleccionados</p>
        </div>
      </div>
    );
  }

  const data = {
    labels: sortedEvents.map(e => {
      const date = new Date(e.timestamp);
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: sortedEvents.map(e => e.temperature),
        fill: true,
        borderColor: '#007AFF',
        backgroundColor: 'rgba(0, 122, 255, 0.05)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#007AFF',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1d1d1f',
        bodyColor: '#1d1d1f',
        borderColor: '#e5e5e7',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.03)' },
        border: { display: false },
        ticks: { color: '#86868b' }
      },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#86868b' }
      },
    },
  };

  return <div className="h-75 w-full"><Line data={data} options={options} /></div>;
};
