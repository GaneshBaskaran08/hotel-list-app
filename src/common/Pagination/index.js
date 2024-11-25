import React from "react";
import styles from "./styles.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        <span className={`material-icons ${styles.icon}`}>arrow_back_ios</span>
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className={styles.paginationButton}
      >
        <span className={`material-icons ${styles.icon}`}>
          arrow_forward_ios
        </span>
      </button>
    </div>
  );
};

export default Pagination;
