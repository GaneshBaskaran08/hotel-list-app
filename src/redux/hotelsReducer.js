import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  hotels: [],
  filteredHotels: [],
  status: "idle",
  error: null,
  filter: {
    searchTerm: "",
    minPrice: 0,
    maxPrice: 1000,
  },
};

const API = process.env.HOTELS_API;

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async () => {
  const response = await axios.get(API);
  return response.data;
});

export const addHotel = createAsyncThunk("hotels/addHotel", async (hotel) => {
  const response = await axios.post(API, hotel);
  return response.data;
});

export const updateHotel = createAsyncThunk(
  "hotels/updateHotel",
  async (hotel) => {
    const response = await axios.put(`${API}/${hotel.id}`, hotel);
    return response.data;
  }
);

export const deleteHotel = createAsyncThunk(
  "hotels/deleteHotel",
  async (id) => {
    await axios.delete(`${API}/${id}`);
    return id;
  }
);

const hotelsReducer = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    setFilteredHotels: (state, action) => {
      state.filteredHotels = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.hotels = action.payload;
        state.filteredHotels = state.hotels.filter((hotel) => {
          const { searchTerm, minPrice, maxPrice } = state.filter;
          const matchesSearch = hotel.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesPrice =
            hotel.price >= minPrice && hotel.price <= maxPrice;
          return matchesSearch && matchesPrice;
        });
      })
      .addCase(addHotel.fulfilled, (state, action) => {
        state.hotels.push(action.payload);
        state.filteredHotels = state.hotels.filter((hotel) => {
          const { searchTerm, minPrice, maxPrice } = state.filter;
          const matchesSearch = hotel.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesPrice =
            hotel.price >= minPrice && hotel.price <= maxPrice;
          return matchesSearch && matchesPrice;
        });
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        const index = state.hotels.findIndex((h) => h.id === action.payload.id);
        state.hotels[index] = action.payload;
        state.filteredHotels = state.hotels.filter((hotel) => {
          const { searchTerm, minPrice, maxPrice } = state.filter;
          const matchesSearch = hotel.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesPrice =
            hotel.price >= minPrice && hotel.price <= maxPrice;
          return matchesSearch && matchesPrice;
        });
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.hotels = state.hotels.filter(
          (hotel) => hotel.id !== action.payload
        );
        state.filteredHotels = state.hotels.filter((hotel) => {
          const { searchTerm, minPrice, maxPrice } = state.filter;
          const matchesSearch = hotel.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
          const matchesPrice =
            hotel.price >= minPrice && hotel.price <= maxPrice;
          return matchesSearch && matchesPrice;
        });
      });
  },
});

export const { setFilter, setFilteredHotels } = hotelsReducer.actions;
export default hotelsReducer.reducer;
