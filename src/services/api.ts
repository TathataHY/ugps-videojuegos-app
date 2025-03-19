import axios from 'axios';
import type { Game, Screenshot, Trailer, Genre, Platform, Developer, Tag } from '../types';

// Configuración de la API
// Probemos con una clave API alternativa ya que es posible que la anterior haya expirado
const API_KEY = '328c7603ac77465895cf471fdbba8270';
const BASE_URL = 'https://api.rawg.io/api';

// Crear instancia de axios con configuración base
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
  headers: {
    'User-Agent': 'UGPS-Videojuegos-App',
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 segundos de timeout para detectar problemas de conexión
});

// Interfaces para las respuestas de la API
export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Servicios para obtener datos de videojuegos
export const gameService = {
  // Obtener lista de juegos ordenados por puntuación Metacritic (descendente)
  getTopRatedGames: (page: number = 1, pageSize: number = 20) => {
    return apiClient.get<ApiResponse<Game>>('/games', {
      params: {
        ordering: '-metacritic',
        page,
        page_size: pageSize,
      },
    });
  },

  // Buscar juegos por texto
  searchGames: (query: string, page: number = 1) => {
    return apiClient.get<ApiResponse<Game>>('/games', {
      params: {
        search: query,
        page,
      },
    });
  },

  // Obtener detalles de un juego por su ID
  getGameDetails: (gameId: number) => {
    return apiClient.get<Game>(`/games/${gameId}`);
  },

  // Obtener screenshots de un juego
  getGameScreenshots: (gameId: number) => {
    return apiClient.get<ApiResponse<Screenshot>>(`/games/${gameId}/screenshots`);
  },

  // Obtener trailers de un juego
  getGameTrailers: (gameId: number) => {
    return apiClient.get<ApiResponse<Trailer>>(`/games/${gameId}/movies`);
  },

  // Obtener géneros
  getGenres: () => {
    return apiClient.get<ApiResponse<Genre>>('/genres');
  },

  // Obtener plataformas
  getPlatforms: () => {
    return apiClient.get<ApiResponse<Platform>>('/platforms');
  },

  // Obtener desarrolladores
  getDevelopers: () => {
    return apiClient.get<ApiResponse<Developer>>('/developers');
  },

  // Obtener tags
  getTags: () => {
    return apiClient.get<ApiResponse<Tag>>('/tags');
  },

  // Filtrar juegos
  filterGames: (
    page: number = 1,
    genres?: number[],
    platforms?: number[],
    developers?: number[],
    tags?: number[],
    dates?: string, // Formato YYYY-MM-DD,YYYY-MM-DD para rango de fechas
    ordering: string = '-metacritic'
  ) => {
    return apiClient.get<ApiResponse<Game>>('/games', {
      params: {
        page,
        genres: genres?.join(','),
        platforms: platforms?.join(','),
        developers: developers?.join(','),
        tags: tags?.join(','),
        dates,
        ordering,
      },
    });
  },
};

export default gameService; 