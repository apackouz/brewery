import { Brewery, BrewerySearchParams } from "../types/types";

const API_BASE_URL = "https://api.openbrewerydb.org/v1/breweries";

export const fetchSingleBrewery = async (
  id: string
): Promise<Brewery | null> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch brewery");
  }
  const data: Brewery = await response.json();
  return data;
};

export const fetchBreweries = async (
  params: BrewerySearchParams = {}
): Promise<Brewery[]> => {
  const url = new URL(API_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch breweries");
  }
  const data: Brewery[] = await response.json();
  return data;
};

export const fetchBreweryMeta = async (
  params: BrewerySearchParams = {}
): Promise<{ total: number }> => {
  const url = new URL(`${API_BASE_URL}/meta`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch brewery metadata");
  }
  const data: { total: number } = await response.json();
  return data;
};
