import React, { useState, useEffect } from 'react';
import type { Game, Screenshot, Trailer } from '../types';
import gameService from '../services/api';

interface GameDetailProps {
  gameId: number;
}

const GameDetail: React.FC<GameDetailProps> = ({ gameId }) => {
  const [game, setGame] = useState<Game | null>(null);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Solicitar los detalles del juego, screenshots y trailers en paralelo
        const [gameRes, screenshotsRes, trailersRes] = await Promise.all([
          gameService.getGameDetails(gameId),
          gameService.getGameScreenshots(gameId),
          gameService.getGameTrailers(gameId),
        ]);
        
        setGame(gameRes.data);
        setScreenshots(screenshotsRes.data.results);
        setTrailers(trailersRes.data.results);
      } catch (err) {
        console.error('Error al cargar los detalles del juego:', err);
        setError('Hubo un error al cargar los detalles del juego. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGameDetails();
  }, [gameId]);
  
  if (loading) {
    return <div className="loading-message">Cargando detalles del juego...</div>;
  }
  
  if (error) {
    return <div className="error-message">{error}</div>;
  }
  
  if (!game) {
    return <div className="error-message">No se encontró el juego.</div>;
  }
  
  return (
    <div className="game-detail-container">
      <button className="back-button" onClick={() => window.history.back()}>
        &larr; Volver
      </button>
      
      <div className="game-header" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${game.background_image})` }}>
        <div className="header-content">
          <h1 className="game-title">{game.name}</h1>
          
          {game.metacritic && (
            <span className={`metacritic-score ${game.metacritic >= 75 ? 'high' : game.metacritic >= 50 ? 'medium' : 'low'}`}>
              {game.metacritic}
            </span>
          )}
          
          <div className="release-date">
            Fecha de lanzamiento: {game.released ? new Date(game.released).toLocaleDateString() : 'TBA'}
          </div>
        </div>
      </div>
      
      <div className="game-content">
        <div className="main-info">
          <section className="game-section">
            <h2 className="section-title">Descripción</h2>
            <div className="description">
              {game.description_raw || 'No hay descripción disponible.'}
            </div>
          </section>
          
          {trailers.length > 0 && (
            <section className="game-section">
              <h2 className="section-title">Trailers</h2>
              <div className="trailers-grid">
                {trailers.map((trailer) => (
                  <div key={trailer.id} className="trailer-item">
                    <div className="video-wrapper">
                      <video 
                        controls 
                        poster={trailer.preview}
                        src={trailer.data.max}
                      >
                        Tu navegador no soporta el elemento video.
                      </video>
                    </div>
                    <h3 className="trailer-title">{trailer.name}</h3>
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {screenshots.length > 0 && (
            <section className="game-section">
              <h2 className="section-title">Capturas de pantalla</h2>
              <div className="screenshots-grid">
                {screenshots.map((screenshot) => (
                  <div key={screenshot.id} className="screenshot-item">
                    <img 
                      className="screenshot-image"
                      src={screenshot.image} 
                      alt={`Captura de ${game.name}`}
                      onClick={() => window.open(screenshot.image, '_blank')}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <aside className="game-sidebar">
          {game.parent_platforms && game.parent_platforms.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">Plataformas</h3>
              <div className="platforms-list">
                {game.parent_platforms.map(({ platform }) => (
                  <span key={platform.id} className="platform-item">
                    {platform.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {game.genres && game.genres.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">Géneros</h3>
              <div className="genres-list">
                {game.genres.map((genre) => (
                  <span key={genre.id} className="genre-item">{genre.name}</span>
                ))}
              </div>
            </div>
          )}
          
          {game.developers && game.developers.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">Desarrolladores</h3>
              <div className="developers-list">
                {game.developers.map((developer) => (
                  <div key={developer.id} className="developer-item">
                    {developer.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {game.publishers && game.publishers.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">Publicado por</h3>
              <div className="publishers-list">
                {game.publishers.map((publisher) => (
                  <div key={publisher.id} className="publisher-item">
                    {publisher.name}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {game.website && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">Sitio web</h3>
              <a className="website-link" href={game.website} target="_blank" rel="noopener noreferrer">
                {game.website}
              </a>
            </div>
          )}
          
          {game.rating && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">Puntuación</h3>
              <div className="rating">{game.rating} / {game.rating_top}</div>
              
              {game.ratings && game.ratings.length > 0 && (
                <div className="rating-bars">
                  {game.ratings.map((rating) => (
                    <div key={rating.id} className="rating-bar">
                      <div className="rating-title">{rating.title}</div>
                      <div className="rating-bar-progress">
                        <div 
                          className="rating-bar-fill" 
                          style={{ width: `${rating.percent}%` }}
                        ></div>
                        <span className="rating-percent">{Math.round(rating.percent)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default GameDetail; 