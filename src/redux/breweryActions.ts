import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSingleBrewery,
  fetchBreweries,
  fetchBreweryMeta,
} from "../api/api";
import { Brewery, BrewerySearchParams } from "../types/types";
import { SerializedError } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { updateSearchParams } from "./brewerySlice";
import { toSerializeError } from "../utils/utils";

export const getSingleBrewery = createAsyncThunk<
  Brewery,
  string,
  { rejectValue: SerializedError }
>("breweries/getSingleBrewery", async (id: string, { rejectWithValue }) => {
  try {
    const brewery: Brewery | null = await fetchSingleBrewery(id);
    if (brewery === null) {
      throw new Error("Brewery not found");
    }
    return brewery;
  } catch (error) {
    return rejectWithValue(toSerializeError(error));
  }
});

export const getBreweries = createAsyncThunk<
  { breweries: Brewery[]; total: number | null },
  BrewerySearchParams,
  { rejectValue: SerializedError; state: RootState }
>(
  "breweries/getBreweries",
  async (
    params: BrewerySearchParams,
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      const state = getState();

      const copyPreviousParams = { ...state.breweries.searchParams };
      const copyParams = { ...params };
      delete copyPreviousParams.page; // pagination
      delete copyParams.page;
      const paramsChanged =
        JSON.stringify(copyPreviousParams) !== JSON.stringify(copyParams);

      let total: number | null = null;
      let breweries: Brewery[] | null = null;

      if (paramsChanged) {
        dispatch(updateSearchParams(params));
        const [meta, breweriesData] = await Promise.all([
          fetchBreweryMeta(params),
          fetchBreweries(params),
        ]);
        total = meta.total;
        breweries = breweriesData;
      } else {
        breweries = await fetchBreweries(params);
      }

      if (breweries === null) {
        throw new Error("Failed to fetch breweries");
      }

      return { breweries, total };
    } catch (error) {
      return rejectWithValue(toSerializeError(error));
    }
  }
);
