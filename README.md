# Smart City Dashboard

Este proyecto es un dashboard interactivo diseñado para el monitoreo en tiempo real de eventos en una ciudad inteligente. La aplicación consume datos de una API externa y visualiza métricas críticas como temperatura y severidad de incidentes.

## 🚀 Características

- **Visualización de Datos:** Gráficos dinámicos de tendencia de temperatura y distribución de severidad usando `Chart.js`.
- **Filtros Avanzados:** Filtrado por ID de dispositivo, zona geográfica, rango de fechas y límite de resultados.
- **Gestión de Severidad:** Interactividad para activar/desactivar la visualización de eventos según su gravedad (Normal, Alerta, Crítico).
- **Diseño Moderno:** Interfaz inspirada en los principios estéticos de Apple/Google (bordes redondeados suaves, sombras sutiles y tipografía limpia).
- **Arquitectura Limpia (Clean Architecture):** Estructura de código organizada por capas para facilitar el mantenimiento y escalabilidad.

## 🛠️ Tecnologías

- **Framework:** [Next.js 16 (React 19)](https://nextjs.org/)
- **Gráficos:** [Chart.js](https://www.chartjs.org/) con `react-chartjs-2`
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Iconos:** [react-icons](https://react-icons.github.io/react-icons/) (Hi, Ci, Bs)
- **HTTP Client:** [Axios](https://axios-http.com/)

## 📐 Arquitectura

El proyecto sigue una estructura de **Arquitectura Limpia** dentro del directorio `/app`:

- **`core/`**: Contiene las entidades de negocio e interfaces de los repositorios (Reglas del Dominio).
- **`infrastructure/`**: Implementaciones de acceso a datos, clientes de API y repositorios concretos.
- **`application/`**: Casos de uso que orquestan la lógica de negocio.
- **`presentation/`**: Componentes de la interfaz de usuario, hooks personalizados y estilos globales.

## 🏁 Inicio Rápido

### Requisitos Previos

- Node.js (v18+)
- pnpm (v8+)

### Instalación

```bash
pnpm install
```

### Ejecución en Desarrollo

```bash
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver el resultado.

## 📡 API de Datos

El dashboard consume eventos desde:
`https://smart-city-events-685287861671.europe-west1.run.app/`

Soporta los siguientes parámetros de búsqueda:
- `deviceId`: ID del sensor.
- `zone`: Zona de la ciudad.
- `startDate` / `endDate`: Rango de fechas (YYYY-MM-DD).
- `limit`: Cantidad de registros.
