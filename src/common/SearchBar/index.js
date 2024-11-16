import React from "react";
import styles from "./styles.module.css";

const SearchBar = ({ placeholder = "Search...", value, onChange }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.searchInput}
      />
      <span className={`${styles.icon} material-icons`}>search</span>
    </div>
  );
};

export default SearchBar;
