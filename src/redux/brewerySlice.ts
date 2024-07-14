import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BreweryState, Brewery, BrewerySearchParams } from "../types/types";
import { getSingleBrewery, getBreweries } from "./breweryActions";
import { SerializedError } from "@reduxjs/toolkit";
import { ITEMS_PER_PAGE } from "../types/constants";

const initialState: BreweryState = {
  favorites: {},
  onFavoritePage: 1,

  allBreweries: [],
  totalBreweries: 100,
  onBreweryPage: 1,

  searchParams: {},
  currentView: "all",
  onPageNumber: 1,

  viewItemsLength: 100,
  loading: false,
  error: null,
};

const brewerySlice = createSlice({
  name: "breweries",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Brewery>) => {
      state.favorites[action.payload.id] = action.payload;
    },
    removeFavorite: (state, action: PayloadAction<Brewery>) => {
      delete state.favorites[action.payload.id];
    },
    clearFavorites: (state) => {
      state.favorites = {};
    },
    updateSearchParams: (state, action: PayloadAction<BrewerySearchParams>) => {
      state.searchParams = action.payload;
    },
    setRenderComponent: (state, action: PayloadAction<"all" | "fav">) => {
      state.currentView = action.payload;
      if (action.payload === "all") {
        state.onPageNumber = state.onBreweryPage;
        state.viewItemsLength = state.totalBreweries;
      } else {
        state.onPageNumber = state.onFavoritePage;
        state.viewItemsLength = Object.keys(state.favorites).length;
      }
    },
    changePage: (
      state,
      action: PayloadAction<"forward" | "backwards" | number>
    ) => {
      const totalPages = Math.ceil(state.viewItemsLength / ITEMS_PER_PAGE);
      if (typeof action.payload === "number") {
        state.onPageNumber = Math.max(1, Math.min(action.payload, totalPages));
      } else if (action.payload === "forward") {
        state.onPageNumber = Math.min(state.onPageNumber + 1, totalPages);
      } else {
        state.onPageNumber = Math.max(1, state.onPageNumber - 1);
      }

      if (state.currentView === "all") {
        state.onBreweryPage = state.onPageNumber;
      } else {
        state.onFavoritePage = state.onPageNumber;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleBrewery.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getSingleBrewery.fulfilled,
        (state, action: PayloadAction<Brewery>) => {
          state.loading = false;
          state.allBreweries = [action.payload];
        }
      )
      .addCase(getSingleBrewery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
      })
      .addCase(getBreweries.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getBreweries.fulfilled,
        (
          state,
          action: PayloadAction<{ breweries: Brewery[]; total: number | null }>
        ) => {
          state.loading = false;
          state.allBreweries = action.payload.breweries;
          if (action.payload.total !== null) {
            state.totalBreweries = action.payload.total;
            state.viewItemsLength = action.payload.total;
          }
        }
      )
      .addCase(getBreweries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as SerializedError;
      });
  },
});

export const {
  addFavorite,
  removeFavorite,
  clearFavorites,
  setRenderComponent,
  changePage,
  updateSearchParams,
} = brewerySlice.actions;

export default brewerySlice.reducer;
