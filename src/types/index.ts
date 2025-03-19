// Tipos para los datos de la API

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: PlatformElement[];
  parent_platforms: ParentPlatform[];
  genres: Genre[];
  stores: Store[];
  tags: Tag[];
  esrb_rating: EsrbRating;
  short_screenshots: ShortScreenshot[];
  description?: string;
  description_raw?: string;
  developers?: Developer[];
  publishers?: Publisher[];
  website?: string;
  reddit_url?: string;
  reddit_name?: string;
  reddit_description?: string;
  reddit_logo?: string;
  metacritic_url?: string;
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface PlatformElement {
  platform: PlatformPlatform;
  released_at: string;
  requirements_en?: Requirements;
  requirements_ru?: Requirements;
}

export interface PlatformPlatform {
  id: number;
  name: string;
  slug: string;
  image?: string;
  year_end?: number;
  year_start?: number;
  games_count: number;
  image_background: string;
}

export interface Requirements {
  minimum: string;
  recommended: string;
}

export interface ParentPlatform {
  platform: Platform;
}

export interface Platform {
  id: number;
  name: string;
  slug: string;
  image_background?: string;
  games_count?: number;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Store {
  id: number;
  store: StoreStore;
  url: string;
}

export interface StoreStore {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface ShortScreenshot {
  id: number;
  image: string;
}

export interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
}

export interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: {
    480: string;
    max: string;
  };
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
} 