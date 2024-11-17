import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import SearchBar from "../../../../common/SearchBar";
import PriceRangeFilter from "./components/PriceRangeFilter";
import FormModal from "../../../../common/Form";
import {
  setFilter,
  fetchHotels,
  filterFetchHotels,
  addHotel,
} from "../../../../redux/hotelsReducer";

const HomeFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.hotels);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const handleSearchChange = (event) => {
    dispatch(setFilter({ title: event.target.value }));
  };

  const handleApplyFilter = (priceRange) => {
    dispatch(setFilter(priceRange));
    dispatch(filterFetchHotels({ ...filter, ...priceRange }));
  };

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
      <SearchBar value={filter.title} onChange={handleSearchChange} />
      <div>
        <div className={styles.text}>Price Range:</div>
        <PriceRangeFilter
          minValue={filter.minPrice}
          maxValue={filter.maxPrice}
          onApply={handleApplyFilter}
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
