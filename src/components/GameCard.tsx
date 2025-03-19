import React from 'react';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick: (id: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  return (
    <div className="game-card" onClick={() => onClick(game.id)}>
      {game.background_image ? (
        <img className="game-image" src={game.background_image} alt={game.name} />
      ) : (
        <div className="no-image">Sin imagen</div>
      )}
      <div className="content">
        <h3 className="title">{game.name}</h3>
        <span className="release-date">
          {game.released ? new Date(game.released).getFullYear() : 'TBA'}
        </span>
        
        {game.metacritic && (
          <span 
            className={`metacritic-score ${
              game.metacritic >= 75 ? 'high' : game.metacritic >= 50 ? 'medium' : 'low'
            }`}
          >
            {game.metacritic}
          </span>
        )}
        
        {game.parent_platforms && (
          <div className="platform-list">
            {game.parent_platforms.map(({ platform }) => (
              <span key={platform.id} className="platform">{platform.name}</span>
            ))}
          </div>
        )}
        
        {game.genres && (
          <span className="genres">
            {game.genres.slice(0, 3).map((genre) => genre.name).join(', ')}
          </span>
        )}
      </div>
    </div>
  );
};

export default GameCard; 