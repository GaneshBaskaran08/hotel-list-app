import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    price: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      if (typeof initialData.image === "string") {
        setImagePreview(initialData.image);
      } else if (initialData.image instanceof File) {
        setImagePreview(URL.createObjectURL(initialData.image));
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.latitude) newErrors.latitude = "Latitude is required";
    if (!formData.longitude) newErrors.longitude = "Longitude is required";
    if (!formData.price) newErrors.price = "Price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h2>{isEditing ? "Edit Item" : "Create Item"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className={styles.error}>{errors.title}</p>}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className={styles.error}>{errors.description}</p>
          )}

          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
          {errors.latitude && <p className={styles.error}>{errors.latitude}</p>}

          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
          {errors.longitude && (
            <p className={styles.error}>{errors.longitude}</p>
          )}

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p className={styles.error}>{errors.price}</p>}

          <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.preview}
              />
            )}
          </div>
          <div className={styles.buttons}>
            <button type="submit">{isEditing ? "Update" : "Create"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
