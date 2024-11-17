import React from "react";
import { Helmet } from "react-helmet";
import HomeFilter from "./components/HomeFilter";
import HomeList from "./components/HomeList";
import styles from "./styles.module.css";

const HomeComponent = () => {
  return (
    <>
      <Helmet>
        <title>Hotel's List - My App</title>
        <meta
          name="description"
          content="Browse through a list of hotels to find the perfect one for your stay."
        />
        <meta
          name="keywords"
          content="hotels, booking, travel, accommodation"
        />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Hotel's List</h1>
        </div>
        <div className={styles.body}>
          <HomeFilter />
          <HomeList />
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
