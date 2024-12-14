import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdAddCircle, MdEdit, MdDelete } from "react-icons/md";
import "./ProductsList.css";
import Spinner from "./Spinner";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentActive, setCurrentActive] = useState("all");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(15);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true); // Set to true when image is loaded
  };

  const fetchProducts = async () => {
    setLoading(true);
    const response = await axios.get("https://dummyjson.com/products?limit=0");
    setTimeout(() => {
      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
      setCategories([
        "all",
        ...new Set(response.data.products.map((product) => product.category)),
      ]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilter = (category) => {
    setCurrentActive(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    await axios.delete(`https://dummyjson.com/products/${id}`);
    const updatedProducts = products.filter((product) => product.id !== id);

    setTimeout(() => {
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
      setLoading(false);
    }, 300);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 15);
  };

  if (loading) return <Spinner />;

  return (
    <div className="pro-container">
      <div className="products-head">
        <div className="categories-dropdown">
          <label htmlFor="categories"></label>
          <select
            id="categories"
            value={currentActive}
            onChange={(e) => handleFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.replace("-", " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <Link to="/add-product" className="add">
          <MdAddCircle />
          Add Product
        </Link>
      </div>

      <div className="products">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <div className="product" key={product.id}>
            <Link to={`/single/${product.id}`} className="product-link">
              <div className="card">
                <div className="card-body">
                  <div className="card-img">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className={imageLoaded ? "loaded" : ""}
                      onLoad={handleImageLoad}
                    />
                  </div>
                  <div className="card-content">
                    <span className="card-category">{product.category}</span>
                    <h5 className="card-title">{product.title}</h5>
                    <div className="card-bottom">
                      <p className="card-price">{product.price}$</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className="card-buttons">
              <Link to={`/update-product/${product.id}`}>
                <button className="update-button">
                  <MdEdit />
                </button>
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="delete-button"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <div className="show-more">
          <button onClick={handleShowMore}>Show More</button>
        </div>
      )}
    </div>
  );
}

export default ProductsList;
