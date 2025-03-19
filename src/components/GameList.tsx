import React, { useState, useEffect } from 'react';
import type { Game } from '../types';
import gameService from '../services/api';
import GameCard from './GameCard';
import SearchBar from './SearchBar';
import FilterSection from './FilterSection';
import type { FilterOptions } from './FilterSection';
import axios from 'axios';

const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({});
  
  // En un entorno con React Router completo usaríamos useNavigate
  // pero como estamos en Astro, simulamos la navegación
  const navigate = (path: string) => {
    window.location.href = path;
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let response;
        
        if (searchQuery) {
          // Si hay una búsqueda activa
          response = await gameService.searchGames(searchQuery, currentPage);
        } else if (Object.keys(filters).length > 0) {
          // Si hay filtros activos
          response = await gameService.filterGames(
            currentPage,
            filters.genres,
            filters.platforms,
            filters.developers,
            filters.tags,
            filters.years
          );
        } else {
          // Carga por defecto: videojuegos ordenados por Metacritic
          response = await gameService.getTopRatedGames(currentPage);
        }
        
        if (response.data && response.data.results) {
          setGames(response.data.results);
          setTotalPages(Math.ceil(response.data.count / 20)); // 20 juegos por página
        } else {
          throw new Error('La respuesta de la API no tiene el formato esperado');
        }
      } catch (err) {
        console.error('Error al cargar los videojuegos:', err);
        let errorMsg = 'Error desconocido';
        
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // Error de la API
            errorMsg = `Error ${err.response.status}: ${err.response.statusText || 'Error de API'}`;
          } else if (err.request) {
            // No se recibió respuesta
            errorMsg = 'No se recibió respuesta del servidor. Verifica tu conexión a Internet.';
          } else {
            // Error en la configuración
            errorMsg = `Error en la configuración: ${err.message}`;
          }
        } else if (err instanceof Error) {
          errorMsg = err.message;
        }
        
        setError(`Hubo un error al cargar los videojuegos: ${errorMsg}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGames();
  }, [searchQuery, currentPage, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Resetear a la primera página cuando se realiza una búsqueda
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Resetear a la primera página cuando se aplican filtros
  };

  const handleGameClick = (gameId: number) => {
    navigate(`/game/${gameId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="game-list-container">
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="content-container">
        <div className="filter-container">
          <FilterSection onFilterChange={handleFilterChange} />
        </div>
        
        <div className="games-container">
          {loading ? (
            <div className="loading-message">
              Cargando videojuegos...
              <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#aaa' }}>
                Estado: {loading ? 'Cargando' : 'Completado'}, 
                Error: {error ? 'Sí' : 'No'}, 
                Juegos: {games.length}, 
                Página: {currentPage}/{totalPages}
              </div>
            </div>
          ) : error ? (
            <div className="error-message">
              {error}
              <button 
                className="retry-button" 
                onClick={() => setCurrentPage(currentPage)}
                style={{ marginTop: '15px', padding: '8px 16px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Reintentar
              </button>
            </div>
          ) : games.length === 0 ? (
            <div className="no-games-message">
              No se encontraron videojuegos. Intenta con otra búsqueda o ajusta los filtros.
            </div>
          ) : (
            <>
              <div className="games-grid">
                {games.map((game) => (
                  <div key={game.id} className="game-card-wrapper">
                    <GameCard game={game} onClick={handleGameClick} />
                  </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  
                  <div className="page-info">
                    Página {currentPage} de {totalPages}
                  </div>
                  
                  <button 
                    className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameList; 