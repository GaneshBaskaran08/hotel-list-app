import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import SearchBar from "../../../../common/SearchBar";
import PriceRangeFilter from "./components/PriceRangeFilter";
import FormModal from "../../../../common/Form";
import { setFilter, fetchHotels, addHotel, setFilteredHotels } from "../../../../redux/hotelsReducer";

const HomeFilter = () => {
  const dispatch = useDispatch();
  const { hotels, filteredHotels, filter } = useSelector((state) => state.hotels);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  // Handle search filter change
  const handleChange = (event) => {
    dispatch(setFilter({ searchTerm: event.target.value }));
    filterHotels(event.target.value, filter.minPrice, filter.maxPrice); // Apply filter after search term change
  };

  // Handle price range filter
  const handleApply = (priceRange) => {
    dispatch(setFilter(priceRange));
    filterHotels(filter.searchTerm, priceRange.minPrice, priceRange.maxPrice); // Apply filter after price range change
  };

  // Filter hotels based on search term and price range
  const filterHotels = (searchTerm, minPrice, maxPrice) => {
    const filtered = hotels.filter((hotel) => {
      const matchesSearch = hotel.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = hotel.price >= minPrice && hotel.price <= maxPrice;
      return matchesSearch && matchesPrice;
    });
    console.log(filtered,'filtered')
    dispatch(setFilteredHotels(filtered)); // Update filteredHotels in Redux store
  };

  // Fetch hotels initially
  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  // Handle hotel creation
  const handleCreate = () => {
    setCurrentData(null);
    setIsModalOpen(true);
  };

  // Handle form submission for creating/updating hotel
  const handleSubmit = (data) => {
    dispatch(addHotel(data));
    setIsModalOpen(false);
    alert("Item saved successfully!");
  };

  return (
    <div className={styles.container}>
      <SearchBar value={filter.searchTerm} onChange={handleChange} />
      <div>
        <div className={styles.text}>Price Range:</div>
        <PriceRangeFilter
          minValue={filter.minPrice}
          maxValue={filter.maxPrice}
          onApply={handleApply}
        />
      </div>
      <div className={styles.text}>Create Hotel:</div>
      <button className={styles.button} onClick={handleCreate}>
        Create
      </button>

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={currentData}
      />
    </div>
  );
};

export default HomeFilter;
