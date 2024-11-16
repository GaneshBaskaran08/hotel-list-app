import React from "react";
import HomeFilter from "./components/HomeFilter";
import HomeList from "./components/HomeList";
import styles from "./styles.module.css";

const HomeComponent = () => {
  return (
    <>
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
