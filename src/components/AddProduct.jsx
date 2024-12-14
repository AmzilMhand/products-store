import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import './AddProduct.css';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '', // Changed from 'images' array to single string (URL)
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dummyjson.com/products/add', product);
      const addedProduct = response.data;
      
      // After adding the product to the backend, navigate to the product list page
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-head">
        <button onClick={() => navigate('/products')} className="back-button">
          <MdArrowBack /> Back to Products
        </button>
      </div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="smartphones">Smartphones</option>
            <option value="laptops">Laptops</option>
            <option value="fragrances">Fragrances</option>
            <option value="skincare">Skincare</option>
            <option value="groceries">Groceries</option>
            <option value="home-decoration">Home Decoration</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image" // Changed to single field
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
