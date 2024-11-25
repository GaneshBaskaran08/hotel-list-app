import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HotelMapComponent from "./components/Gmap";
import HotelInfoComponent from "./components/Info";
import { fetchHotelById } from "../../redux/hotelsReducer";
import styles from "./styles.module.css";

const HotelDetailsComponent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { hotels } = useSelector((state) => state.hotels);
  useEffect(() => {
    if (id) {
      dispatch(fetchHotelById(id));
    }
  }, [id, dispatch]);

  const hotel = hotels.length > 0 ? hotels[0] : null;
  return (
    <>
      <Helmet>
        <title>{"Hotel Details - My App"}</title>
        <meta
          name="description"
          content={
            hotel
              ? `Explore details of ${hotel.name}, including location and amenities.`
              : "Hotel details page"
          }
        />
        <meta name="keywords" content="hotel, booking, travel, accommodation" />
        {hotel && <meta property="og:image" content={hotel.image} />}
      </Helmet>
      <div className={styles.container}>
        <HotelInfoComponent hotel={hotel} />
        <HotelMapComponent hotel={hotel} />
      </div>
    </>
  );
};

export default HotelDetailsComponent;
