import React from "react";
import { Marker, APIProvider, Map } from "@vis.gl/react-google-maps";
import styles from "./styles.module.css";

const containerStyle = {
  height: "500px",
  width: "100%",
};

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
};

const HotelMapComponent = ({ hotel }) => {
  const libraries = ["places", "drawing", "geometry"];
  if (!hotel) {
    return <div className={styles.container}>No Data</div>;
  }
  return (
    <div className={styles.container}>
      <APIProvider
        apiKey="AIzaSyDoF9WgOn5j9p2b9GZCtQwR4FKOQHZRtfo"
        libraries={libraries}
      >
        <Map
          mapId={"satellite"}
          defaultZoom={5}
          style={containerStyle}
          defaultCenter={defaultCenter}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          <Marker
            key={hotel.id}
            position={{
              lat: parseFloat(hotel.latitude),
              lng: parseFloat(hotel.longitude),
            }}
            title={hotel.title}
          />
        </Map>
      </APIProvider>
    </div>
  );
};

export default HotelMapComponent;
