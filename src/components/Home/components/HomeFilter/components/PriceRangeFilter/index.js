import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const PriceRangeFilter = ({ minValue, maxValue, onApply }) => {
  const [minPrice, setMinPrice] = useState(minValue);
  const [maxPrice, setMaxPrice] = useState(maxValue);

  useEffect(() => {
    setMinPrice(minValue);
    setMaxPrice(maxValue);
  }, [minValue, maxValue]);

  const handleMinChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleApply = () => {
    onApply({ minPrice: Number(minPrice), maxPrice: Number(maxPrice) });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <input
          type="number"
          value={minPrice}
          onChange={handleMinChange}
          placeholder="Min"
        />
        <span className="separator">-</span>
        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxChange}
          placeholder="Max"
        />
      </div>
      <button className={styles.button} onClick={handleApply}>
        Apply
      </button>
    </div>
  );
};

export default PriceRangeFilter;
