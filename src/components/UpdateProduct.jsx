import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
// import './UpdateProduct.css';

const UpdateProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [''],
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoriesResponse] = await Promise.all([
          axios.get(`https://dummyjson.com/products/${id}`),
          axios.get('https://dummyjson.com/products/categories')
        ]);
        setProduct(productResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://dummyjson.com/products/${id}`, product);
      navigate(`/single/${id}`);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="update-product-container">
      <button onClick={() => navigate(`/single/${id}`)} className="back-button">
        <MdArrowBack /> Back to Product
      </button>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} className="update-product-form">
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
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
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
        <input
          type="url"
          name="images"
          value={product.images[0]}
          onChange={(e) => setProduct({ ...product, images: [e.target.value] })}
          placeholder="Image URL"
          required
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;

