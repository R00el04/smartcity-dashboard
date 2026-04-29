'use client';

import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { SmartCityEvent } from '../../core/entities/event.entity';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SeverityChartProps {
  events: SmartCityEvent[];
  visibleSeverities: Set<string>;
  onSeverityToggle: (severity: string) => void;
}

export const SeverityChart: React.FC<SeverityChartProps> = ({ events, visibleSeverities, onSeverityToggle }) => {
  if (events.length === 0) {
    return (
      <div className="h-75 w-full flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-lg font-medium">Sin datos</p>
          <p className="text-sm">No hay eventos que mostrar</p>
        </div>
      </div>
    );
  }

  const counts = events.reduce((acc, event) => {
    const sev = event.severity as string;
    acc[sev] = (acc[sev] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const severities = ['normal', 'alerta', 'critico'] as const;
  const colors = ['#34C759', '#FF9500', '#FF3B30'];
  const disabledColor = '#D1D5DB';

  const backgroundColor = severities.map((sev, idx) =>
    visibleSeverities.has(sev) ? colors[idx] : disabledColor
  );

  const data = {
    labels: ['Normal', 'Alerta', 'Crítico'],
    datasets: [
      {
        data: [counts.normal || 0, counts.alerta || 0, counts.critico || 0],
        backgroundColor,
        borderWidth: 0,
        hoverOffset: 10,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          color: '#86868b',
          font: { size: 13 },
          generateLabels: (chart) => {
            return chart.data.labels?.map((label, idx) => ({
              text: label as string,
              fillStyle: backgroundColor[idx],
              hidden: !visibleSeverities.has(severities[idx]),
              index: idx,
              pointStyle: 'circle',
              strokeStyle: 'transparent',
            })) || [];
          },
        },
        onClick: (e, legendItem) => {
          const severityMap: Record<number, string> = { 0: 'normal', 1: 'alerta', 2: 'critico' };
          const severity = severityMap[legendItem.index ?? 0];
          onSeverityToggle(severity);
          return false;
        },
      },
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
  };

  return <div className="h-75 w-full"><Doughnut data={data} options={options} /></div>;
};
