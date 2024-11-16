import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./redux/hotelsReducer";

export const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
  },
});

export default store;
