'use client';

import { useState } from 'react';
import { useEvents } from './presentation/hooks/useEvents';
import { TemperatureChart } from './presentation/components/TemperatureChart';
import { SeverityChart } from './presentation/components/SeverityChart';
import { Filters } from './presentation/components/Filters';
import { Card } from './presentation/components/Card';
import { HiOutlineShieldExclamation, HiOutlineMap, HiOutlineRefresh } from 'react-icons/hi';
import { CiTempHigh} from 'react-icons/ci';
import { BsActivity } from 'react-icons/bs';

export default function DashboardPage() {
  const { events, loading, filters, updateFilters, refresh } = useEvents({ limit: 50 });
  const [visibleSeverities, setVisibleSeverities] = useState<Set<string>>(new Set(['normal', 'alerta', 'critico']));

  const handleSeverityToggle = (severity: string) => {
    setVisibleSeverities((prev) => {
      const updated = new Set(prev);
      if (updated.has(severity)) {
        updated.delete(severity);
      } else {
        updated.add(severity);
      }
      return updated;
    });
  };

  const filteredEvents = events.filter((event) => visibleSeverities.has(event.severity));

  return (
    <main className="min-h-screen bg-[#F5F5F7] p-4 md:p-8 lg:p-12 text-[#1d1d1f]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight mb-2">Smart City Dashboard</h1>
            <p className="text-gray-500 text-lg">Monitoreo de eventos en tiempo real</p>
          </div>
          <button 
            onClick={refresh}
            className="bg-white p-4 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center"
            disabled={loading}
          >
            <HiOutlineRefresh className={`text-blue-600 ${loading ? 'animate-spin' : ''}`} size={24} />
          </button>
        </header>

        {/* Filters */}
        <Filters filters={filters} onFilterChange={updateFilters} />

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Eventos" 
            value={filteredEvents.length} 
            icon={<BsActivity className="text-blue-500" size={24} />} 
            color="bg-blue-50"
          />
          <StatCard 
            title="Temp. Promedio" 
            value={filteredEvents.length > 0 
              ? (filteredEvents.reduce((acc, e) => acc + e.temperature, 0) / filteredEvents.length).toFixed(1) + '°C' 
              : '0°C'} 
            icon={<CiTempHigh  className="text-orange-500" size={24} />} 
            color="bg-orange-50"
          />
          <StatCard 
            title="Alertas Críticas" 
            value={filteredEvents.filter(e => e.severity === 'critico').length} 
            icon={<HiOutlineShieldExclamation className="text-red-500" size={24} />} 
            color="bg-red-50"
          />
          <StatCard 
            title="Zonas Activas" 
            value={new Set(filteredEvents.map(e => e.zone)).size} 
            icon={<HiOutlineMap className="text-green-500" size={24} />} 
            color="bg-green-50"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2" title="Tendencia de Temperatura">
            {loading ? (
              <div className="h-75 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="h-75 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p className="text-lg font-medium">Sin datos</p>
                  <p className="text-sm">No hay eventos que mostrar con los filtros seleccionados</p>
                </div>
              </div>
            ) : (
              <TemperatureChart events={events} visibleSeverities={visibleSeverities} />
            )}
          </Card>

          <Card title="Distribución de Severidad">
            {loading ? (
              <div className="h-75 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : events.length === 0 ? (
              <div className="h-75flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <p className="text-lg font-medium">Sin datos</p>
                  <p className="text-sm">No hay eventos disponibles</p>
                </div>
              </div>
            ) : (
              <SeverityChart events={events} visibleSeverities={visibleSeverities} onSeverityToggle={handleSeverityToggle} />
            )}
          </Card>
        </div>

        {/* Recent Events Table */}
        <Card title="Eventos Recientes">
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="text-gray-400 text-sm border-b border-gray-50">
                   <th className="pb-4 font-medium">Dispositivo</th>
                   <th className="pb-4 font-medium">Zona</th>
                   <th className="pb-4 font-medium">Temperatura</th>
                   <th className="pb-4 font-medium">Severidad</th>
                   <th className="pb-4 font-medium">Hora</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                 {filteredEvents.slice(0, 10).map((event) => (
                   <tr key={event.eventId} className="hover:bg-gray-50/50 transition-colors">
                     <td className="py-4 font-medium">{event.deviceId}</td>
                     <td className="py-4 text-gray-500">{event.zone}</td>
                     <td className="py-4 font-semibold">{event.temperature}°C</td>
                     <td className="py-4">
                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                         event.severity === 'critico' ? 'bg-red-100 text-red-600' :
                         event.severity === 'alerta' ? 'bg-orange-100 text-orange-600' :
                         'bg-green-100 text-green-600'
                       }`}>
                         {event.severity.toUpperCase()}
                       </span>
                     </td>
                     <td className="py-4 text-gray-400 text-sm">
                       {new Date(event.timestamp).toLocaleTimeString()}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
             {filteredEvents.length === 0 && !loading && (
               <div className="py-12 text-center text-gray-400">No se encontraron eventos con los filtros seleccionados.</div>
             )}
           </div>
        </Card>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm flex items-center gap-4">
      <div className={`p-4 rounded-2xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
