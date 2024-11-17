import React from "react";
import styles from "./styles.module.css";

const HotelInfoComponent = ({ hotel }) => {
  console.log(hotel, "HotelInfoComponent");
  if (!hotel) {
    return <div className={styles.container}>No Data</div>;
  }

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${hotel.image})` }}>
      <div  className={styles.subContainer}>
      <div className={styles.contant}>
        <h2 className={styles.title}>{hotel?.title}</h2>
        <div className={styles.about}>
          <p className={styles.sub}>About:</p>
          <p className={styles.description}>{hotel?.description}</p>
        </div>
      </div>
      <p className={styles.sub}>Price: ${hotel?.price}</p>
      </div>
    </div>
  );
};

export default HotelInfoComponent;
