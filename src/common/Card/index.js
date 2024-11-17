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
  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + ".....";
    }
    return text;
  };
  return (
    <div className={styles.container}>
      <img onClick={onSelect} src={image} alt={name} className={styles.image} />
      <div className={styles.content}>
        <div onClick={onSelect}>
          <h5 className={styles.name}>{name}</h5>
          <p className={styles.price}>${price}</p>
          <p className={styles.description}>{truncateDescription(description, 100)}</p>
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
