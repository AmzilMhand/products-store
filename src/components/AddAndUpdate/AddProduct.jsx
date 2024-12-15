import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getCategories } from "../../Config/actions";
import Modal from '../Modal/Modal'; 

function AddProduct({ isOpen, onClose }) {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    images: ["", "", ""],
    stock: "",
    warrantyInformation: "",
    shippingInformation: "",
    rating: "",
    discountPercentage: "",
    availabilityStatus: "In Stock"
  });

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("image")) {
      const updatedImages = [...product.images];
      updatedImages[name.slice(-1) - 1] = value;
      setProduct({ ...product, images: updatedImages });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(product));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="product-form">
        <h1>Add New Product</h1>
        <div className="form-container">
          <div className="form-section">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Description"
                required
              ></textarea>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
                required
              />
              <input
                type="number"
                step="0.1"
                name="rating"
                value={product.rating}
                onChange={handleChange}
                placeholder="Rating (out of 5)"
                required
                min="0"
                max="5"
              />

              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories?.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="Stock"
                required
              />
              <select
                name="availabilityStatus"
                value={product.availabilityStatus}
                onChange={handleChange}
                required
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <input
                type="text"
                name="warrantyInformation"
                value={product.warrantyInformation}
                onChange={handleChange}
                placeholder="Warranty Information"
                required
              />
              <input
                type="text"
                name="shippingInformation"
                value={product.shippingInformation}
                onChange={handleChange}
                placeholder="Shipping Information"
                required
              />
              <input
                type="number"
                name="discountPercentage"
                value={product.discountPercentage}
                onChange={handleChange}
                placeholder="Discount Percentage"
                required
                min="0"
                max="100"
              />
              {product.images.map((image, index) => (
                <input
                  key={index}
                  type="text"
                  name={`image${index + 1}`}
                  value={image}
                  onChange={handleChange}
                  placeholder={`Image URL ${index + 1}`}
                  required
                />
              ))}
              <button type="submit">Add Product</button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddProduct;
