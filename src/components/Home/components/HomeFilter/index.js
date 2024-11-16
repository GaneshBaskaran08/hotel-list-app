import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import SearchBar from "../../../../common/SearchBar";
import PriceRangeFilter from "./components/PriceRangeFilter";
import FormModal from "../../../../common/Form";
import { setFilter, fetchHotels, addHotel, setFilteredHotels } from "../../../../redux/hotelsReducer";

const HomeFilter = () => {
  const dispatch = useDispatch();
  const { hotels, filter } = useSelector((state) => state.hotels);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  const handleChange = (event) => {
    dispatch(setFilter({ searchTerm: event.target.value }));
    filterHotels(event.target.value, filter.minPrice, filter.maxPrice);
  };

  const handleApply = (priceRange) => {
    dispatch(setFilter(priceRange));
    filterHotels(filter.searchTerm, priceRange.minPrice, priceRange.maxPrice);
  };

  const filterHotels = (searchTerm, minPrice, maxPrice) => {
    const filtered = hotels.filter((hotel) => {
      const matchesSearch = hotel.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = hotel.price >= minPrice && hotel.price <= maxPrice;
      return matchesSearch && matchesPrice;
    });
    dispatch(setFilteredHotels(filtered));
  };

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const handleCreate = () => {
    setCurrentData(null);
    setIsModalOpen(true);
  };

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
