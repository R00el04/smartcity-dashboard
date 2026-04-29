@AGENTS.md
# Guía para Agentes (AI Rules)

Este documento contiene las reglas y convenciones específicas para este proyecto Next.js 16 que utiliza Clean Architecture.

## 🏗️ Estructura del Proyecto

Todas las capas de la arquitectura deben residir dentro de la carpeta `/app` para mantener la coherencia con el App Router:

1.  **Capa de Dominio (`/app/core`)**: No debe tener dependencias de librerías externas. Define interfaces (`repositories`) y tipos de datos (`entities`).
2.  **Capa de Aplicación (`/app/application`)**: Contiene los casos de uso (`use-cases`). Cada caso de uso debe tener una única responsabilidad.
3.  **Capa de Infraestructura (`/app/infrastructure`)**: Implementaciones reales de la API. Se usa `api-client.ts` para centralizar la configuración de Axios.
4.  **Capa de Presentación (`/app/presentation`)**:
    *   **Hooks**: `useEvents.ts` actúa como el controlador, inyectando los casos de uso.
    *   **Components**: Deben ser atómicos y reutilizables.
    *   **Styles**: Uso estricto de Tailwind CSS siguiendo el diseño de bordes redondeados (`rounded-[28px]`).

## 🛠️ Convenciones de Desarrollo

- **React 19**: Evitar llamadas sincrónicas a `setState` dentro de `useEffect` para prevenir re-renders en cascada.
- **Tipado**: Uso estricto de TypeScript para todas las entidades y props de componentes.
- **Iconos**: Utilizar `react-icons`. Preferir la familia `Hi` (Hero Icons) para consistencia, o `Ci`/`Bs` si es necesario.
- **Chart.js**: Registrar siempre los componentes necesarios en cada archivo de gráfico (`ChartJS.register(...)`) para evitar errores de "missing element".
- **Severidades**: Los términos oficiales son `normal`, `alerta` y `critico`.

## 📦 Gestión de Dependencias

- Utilizar **pnpm** exclusivamente para la instalación de paquetes.
- Si se añade una librería de UI, debe ser compatible con React 19 y no romper la estética minimalista del proyecto.

## 🚀 Despliegue

- Optimizado para **Vercel**.
- Asegurarse de que las variables de entorno para la API estén configuradas si se decide externalizar la URL.
