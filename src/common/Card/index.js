import React from "react";
import styles from "./styles.module.css";

const Card = ({
  image,
  name,
  price,
  description,
  onEdit,
  onDelete,
  onSelect,
}) => {
  return (
    <div className={styles.container}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.content}>
        <div onClick={onSelect}>
          <h5 className={styles.name}>{name}</h5>
          <p className={styles.price}>${price}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.actions}>
          <span
            className={`material-icons ${styles.editIcon}`}
            onClick={onEdit}
          >
            edit
          </span>
          <span
            className={`material-icons ${styles.deleteIcon}`}
            onClick={onDelete}
          >
            delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
