import React, { useState, useEffect } from 'react';
import type { Genre, Platform, Developer, Tag } from '../types';
import gameService from '../services/api';

interface FilterSectionProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  genres?: number[];
  platforms?: number[];
  developers?: number[];
  tags?: number[];
  years?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({ onFilterChange }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({});
  const [yearRange, setYearRange] = useState<[number, number]>([2000, new Date().getFullYear()]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoading(true);
        const [genresRes, platformsRes, developersRes, tagsRes] = await Promise.all([
          gameService.getGenres(),
          gameService.getPlatforms(),
          gameService.getDevelopers(),
          gameService.getTags(),
        ]);

        setGenres(genresRes.data.results);
        setPlatforms(platformsRes.data.results);
        setDevelopers(developersRes.data.results);
        setTags(tagsRes.data.results);
      } catch (error) {
        console.error('Error al cargar los datos de filtrado:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterData();
  }, []);

  const handleFilterChange = (
    type: 'genres' | 'platforms' | 'developers' | 'tags',
    id: number,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const currentIds = prev[type] || [];
      let newIds: number[];

      if (checked) {
        newIds = [...currentIds, id];
      } else {
        newIds = currentIds.filter((currentId) => currentId !== id);
      }

      const updatedFilters = {
        ...prev,
        [type]: newIds.length > 0 ? newIds : undefined,
      };

      // Notificar al componente padre sobre el cambio de filtros
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const handleYearChange = (startYear: number, endYear: number) => {
    setYearRange([startYear, endYear]);
    
    const formattedStartDate = `${startYear}-01-01`;
    const formattedEndDate = `${endYear}-12-31`;
    const dateRange = `${formattedStartDate},${formattedEndDate}`;
    
    setSelectedFilters((prev) => {
      const updatedFilters = {
        ...prev,
        years: dateRange,
      };
      
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  if (loading) {
    return <div className="filter-loading">Cargando filtros...</div>;
  }

  return (
    <div className="filter-container">
      <h2 className="filter-title">Filtros</h2>
      
      <div className="filter-group">
        <h3 className="filter-group-title">Año de lanzamiento</h3>
        <div className="year-range-container">
          <input
            className="year-input"
            type="number"
            min="1970"
            max={new Date().getFullYear()}
            value={yearRange[0]}
            onChange={(e) => handleYearChange(parseInt(e.target.value), yearRange[1])}
          />
          <span className="year-separator">a</span>
          <input
            className="year-input"
            type="number"
            min="1970"
            max={new Date().getFullYear()}
            value={yearRange[1]}
            onChange={(e) => handleYearChange(yearRange[0], parseInt(e.target.value))}
          />
        </div>
      </div>
      
      <div className="filter-group">
        <h3 className="filter-group-title">Géneros</h3>
        <div className="filter-options-list">
          {genres.slice(0, 10).map((genre) => (
            <div key={genre.id} className="filter-checkbox">
              <input
                type="checkbox"
                id={`genre-${genre.id}`}
                onChange={(e) => handleFilterChange('genres', genre.id, e.target.checked)}
              />
              <label htmlFor={`genre-${genre.id}`}>{genre.name}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="filter-group">
        <h3 className="filter-group-title">Plataformas</h3>
        <div className="filter-options-list">
          {platforms.slice(0, 10).map((platform) => (
            <div key={platform.id} className="filter-checkbox">
              <input
                type="checkbox"
                id={`platform-${platform.id}`}
                onChange={(e) => handleFilterChange('platforms', platform.id, e.target.checked)}
              />
              <label htmlFor={`platform-${platform.id}`}>{platform.name}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="filter-group">
        <h3 className="filter-group-title">Desarrolladores</h3>
        <div className="filter-options-list">
          {developers.slice(0, 10).map((developer) => (
            <div key={developer.id} className="filter-checkbox">
              <input
                type="checkbox"
                id={`developer-${developer.id}`}
                onChange={(e) => handleFilterChange('developers', developer.id, e.target.checked)}
              />
              <label htmlFor={`developer-${developer.id}`}>{developer.name}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="filter-group">
        <h3 className="filter-group-title">Tags</h3>
        <div className="filter-options-list">
          {tags.slice(0, 10).map((tag) => (
            <div key={tag.id} className="filter-checkbox">
              <input
                type="checkbox"
                id={`tag-${tag.id}`}
                onChange={(e) => handleFilterChange('tags', tag.id, e.target.checked)}
              />
              <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection; 