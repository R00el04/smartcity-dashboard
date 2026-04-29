import axios from 'axios';

/**
 * Configuración base de Axios para la comunicación con la API.
 * Centralizar esto facilita el mantenimiento si cambia la URL o se agregan tokens de autenticación.
 */
export const apiClient = axios.create({
  baseURL: 'https://smart-city-events-685287861671.europe-west1.run.app',
  headers: {
    'Content-Type': 'application/json',
  },
});
