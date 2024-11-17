import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  hotels: [],
  filteredHotels: [],
  status: "idle",
  error: null,
  filter: {
    title: "",
    minPrice: 0,
    maxPrice: 1000,
  },
};

const API = process.env.REACT_APP_HOTELS_API;

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async () => {
  const response = await axios.get(API);
  return response.data;
});

export const filterFetchHotels = createAsyncThunk(
  "hotels/filterFetchHotels",
  async (filter) => {
    const { title, minPrice, maxPrice } = filter;
    const response = await axios.get(API, {
      params: {
        title: title || "",
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 1000,
      },
    });
    return response.data;
  }
);

export const fetchHotelById = createAsyncThunk(
  "hotels/fetchHotelById",
  async (id) => {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
  }
);


export const addHotel = createAsyncThunk("hotels/addHotel", async (hotel) => {
  const formData = new FormData();
  formData.append("title", hotel.title);
  formData.append("description", hotel.description);
  formData.append("latitude", hotel.latitude);
  formData.append("longitude", hotel.longitude);
  formData.append("price", hotel.price);

  if (hotel.image instanceof File) {
    formData.append("image", hotel.image);
  }
  const response = await axios.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
});

export const updateHotel = createAsyncThunk(
  "hotels/updateHotel",
  async (hotel) => {
    const formData = new FormData();
    formData.append("title", hotel.title);
    formData.append("description", hotel.description);
    formData.append("latitude", hotel.latitude);
    formData.append("longitude", hotel.longitude);
    formData.append("price", hotel.price);

    if (hotel.image instanceof File) {
      formData.append("image", hotel.image);
    }
    const response = await axios.put(`${API}/${hotel.id}`, formData);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.hotels = action.payload;
        state.filteredHotels = [];
      })
      .addCase(filterFetchHotels.fulfilled, (state, action) => {
        state.filteredHotels = action.payload;
        state.hotels = [];
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.hotels = [action.payload];
      })
      .addCase(addHotel.fulfilled, (state, action) => {
        state.hotels.push(action.payload);
      })
      .addCase(updateHotel.fulfilled, (state, action) => {
        const index = state.hotels.findIndex((h) => h.id === action.payload.id);
        state.hotels[index] = action.payload;
      })
      .addCase(deleteHotel.fulfilled, (state, action) => {
        state.hotels = state.hotels.filter(
          (hotel) => hotel.id !== action.payload
        );
      });
  },
});

export const { setFilter } = hotelsReducer.actions;
export default hotelsReducer.reducer;
