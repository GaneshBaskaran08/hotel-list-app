import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Card from "../../../../common/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchHotels,
  filterFetchHotels,
  deleteHotel,
  updateHotel,
} from "../../../../redux/hotelsReducer";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../../common/Pagination";
import FormModal from "../../../../common/Form";

const HomeList = () => {
  const dispatch = useDispatch();
  const { hotels, filteredHotels, filter } = useSelector(
    (state) => state.hotels
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    if (filter.title || filter.minPrice || filter.maxPrice !== 1000) {
      dispatch(filterFetchHotels(filter));
    } else {
      dispatch(fetchHotels());
    }
  }, [dispatch, filter]);

  const hotelsToDisplay = filteredHotels.length > 0 ? filteredHotels : hotels;
  const totalPages = Math.ceil(hotelsToDisplay.length / itemsPerPage);
  const indexOfLastHotel = currentPage * itemsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - itemsPerPage;
  const currentHotels = hotelsToDisplay.slice(
    indexOfFirstHotel,
    indexOfLastHotel
  );

  const handleSelect = (id) => {
    navigate(`/details/${id}`);
  };

  const handleDelete = async (id) => {
    await dispatch(deleteHotel(id));
    alert("Hotel deleted successfully!");
  };

  const handleEdit = (hotel) => {
    setCurrentData(hotel);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
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
        {currentHotels.map((hotel) => (
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
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
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
