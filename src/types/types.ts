import { SerializedError } from "@reduxjs/toolkit";

export interface favoritesType {
  [key: string]: Brewery;
}
export interface BreweryState {
  favorites: favoritesType;
  onFavoritePage: number;

  allBreweries: Brewery[];
  totalBreweries: number;
  onBreweryPage: number;

  searchParams: BrewerySearchParams;
  currentView: "all" | "fav";
  onPageNumber: number;

  viewItemsLength: number;
  loading: boolean;
  error?: null | SerializedError;
}

export type BreweryType =
  | "micro"
  | "nano"
  | "regional"
  | "brewpub"
  | "large"
  | "planning"
  | "bar"
  | "contract"
  | "proprietor"
  | "closed";

export interface Brewery {
  id: string;
  name: string;
  brewery_type: BreweryType;
  address_1?: string | null;
  address_2?: string | null;
  address_3?: string | null;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  phone?: string | null;
  website_url?: string | null;
  longitude?: number | null;
  latitude?: number | null;
  rank?: string;
}

export const BREWERY_TYPES = [
  "alt prop",
  "bar",
  "beer brand",
  "brewpub",
  "cidery",
  "closed",
  "contract",
  "large",
  "location",
  "micro",
  "nano",
  "office only location",
  "planning",
  "proprietor",
  "regional",
  "taproom",
  "beergarden",
] as const;

export interface BrewerySearchParams {
  by_city?: string;
  by_country?: string;
  by_dist?: string;
  by_ids?: string;
  by_name?: string;
  by_state?: string;
  by_postal?: string;
  by_type?: BreweryType;
  page?: number;
  per_page?: number;
  sort?: "asc" | "desc";
}

export interface SerializableError {
  name: string;
  message: string;
  stack?: string;
}

export interface BreweryCardProps {
  brewery: Brewery;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
  onClick: () => void;
  onRankChange?: (id: string, rank: string) => void;
  enableRanking?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface BreweryModalProps
  extends Omit<BreweryCardProps, "onClick" | "children"> {
  removeSelectedBrewery: () => void;
}
