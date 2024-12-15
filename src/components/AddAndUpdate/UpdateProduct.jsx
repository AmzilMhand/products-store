import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../Config/actions";

function UpdateProduct({ product, onClose }) {
  const dispatch = useDispatch();

  const [updatedProduct, setUpdatedProduct] = useState({
    title: product.title || "",
    description: product.description || "",
    price: product.price || "",
    category: product.category || "",
    images: product.images || ["", "", ""],
    rating: product.rating || "",
    stock: product.stock || "",
    availabilityStatus: product.availabilityStatus || "",
    discountPercentage: product.discountPercentage || "",
    warrantyInformation: product.warrantyInformation || "",
    shippingInformation: product.shippingInformation || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...updatedProduct.images];
    newImages[index] = value;
    setUpdatedProduct((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product.id, updatedProduct));
    onClose();
  };

  return (
    <div className="product-form">
      <h1>Update Product</h1>
      <div className="form-container">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={updatedProduct.title}
              onChange={handleChange}
              placeholder="Product Title"
              required
            />

            <textarea
              name="description"
              value={updatedProduct.description}
              onChange={handleChange}
              placeholder="Product Description"
              required
            ></textarea>

            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />

            <input
              type="number"
              name="discountPercentage"
              value={updatedProduct.discountPercentage}
              onChange={handleChange}
              placeholder="Discount %"
            />

            <input
              type="text"
              name="category"
              value={updatedProduct.category}
              onChange={handleChange}
              placeholder="Product Category"
              required
            />

            <input
              type="number"
              name="rating"
              value={updatedProduct.rating}
              onChange={handleChange}
              placeholder="Product Rating"
            />

            <input
              type="number"
              name="stock"
              value={updatedProduct.stock}
              onChange={handleChange}
              placeholder="Items in Stock"
            />

            <input
              type="text"
              name="availabilityStatus"
              value={updatedProduct.availabilityStatus}
              onChange={handleChange}
              placeholder="Availability Status"
            />

            {updatedProduct.images.map((image, index) => (
              <input
                key={index}
                type="text"
                name={`image-${index}`}
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image URL ${index + 1}`}
              />
            ))}
            <input
              type="text"
              name="warrantyInformation"
              value={updatedProduct.warrantyInformation}
              onChange={handleChange}
              placeholder="Warranty Details"
            />

            <input
              type="text"
              name="shippingInformation"
              value={updatedProduct.shippingInformation}
              onChange={handleChange}
              placeholder="Shipping Details"
            />

            <button type="submit" className="update-btn">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
