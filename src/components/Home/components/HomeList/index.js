import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Card from "../../../../common/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchHotels,
  filterFetchHotels,
  deleteHotel,
  updateHotel,
  setPage,
} from "../../../../redux/hotelsReducer";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../../common/Pagination";
import FormModal from "../../../../common/Form";

const HomeList = () => {
  const dispatch = useDispatch();
  const {
    hotels,
    filteredHotels,
    filter,
    currentPage,
    itemsPerPage,
    totalItems,
  } = useSelector((state) => state.hotels);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (filter.title || filter.minPrice || filter.maxPrice !== 1000) {
        await dispatch(
          filterFetchHotels({ filter, page: currentPage, limit: itemsPerPage })
        );
      } else {
        await dispatch(fetchHotels({ page: currentPage, limit: itemsPerPage }));
      }
    };
    fetchData();
  }, [dispatch, filter, currentPage, itemsPerPage]);

  const hotelsToDisplay = filteredHotels.length > 0 ? filteredHotels : hotels;

  const handleSelect = (id) => {
    navigate(`/details/${id}`);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteHotel(id));
    alert("Hotel deleted successfully!");
    dispatch(fetchHotels({ page: currentPage, limit: itemsPerPage }));
  };

  const handleEdit = (hotel) => {
    setCurrentData(hotel);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const handleSubmit = async (data) => {
    if (isEditing) {
      await dispatch(updateHotel(data));
      alert("Hotel updated successfully!");
    }
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {hotelsToDisplay.length ? (
          hotelsToDisplay.map((hotel) => (
            <Card
              key={hotel.id}
              name={hotel.title}
              price={hotel.price}
              image={hotel.image}
              description={hotel.description}
              onSelect={() => handleSelect(hotel.id)}
              onDelete={() => handleDelete(hotel.id)}
              onEdit={() => handleEdit(hotel)}
            />
          ))
        ) : (
          <p  className={styles.noHotelsMessage}>No hotels available</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / itemsPerPage)}
        onPageChange={handlePageChange}
      />
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={currentData}
        isEditing={isEditing}
      />
    </div>
  );
};

export default HomeList;
