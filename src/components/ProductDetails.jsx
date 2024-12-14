import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdEdit, MdOutlineStar, MdArrowBack } from "react-icons/md";
import { FaBox, FaShieldAlt, FaTruck } from "react-icons/fa";
import Spinner from "./Spinner";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        if (response.status === 200) {
          setProduct(response.data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const getInitials = (name) => {
    const nameArr = name.split(" ");
    const initials = nameArr[0][0] + nameArr[1][0];
    return initials.toUpperCase();
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://dummyjson.com/products/${id}`);
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    navigate("/products");
  };

  if (loading) return <Spinner />;

  return (
    <div className="details-container">
      <div className="details-head">
        <Link to="/products" className="Back-link">
          <MdArrowBack /> Back To Products
        </Link>
      </div>

      <div className="details-content">
        <div>
          {product.images && product.images.length >= 3 && (
            <div className="image-gallery">
              {product.images.slice(0, 3).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product image ${index + 1}`}
                  onClick={() => setImgIndex(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="left-content">
          <div className="pro-image">
            <img src={product.images[imgIndex]} alt={product.title} />
          </div>
        </div>

        <div className="right-content">
          <h2 className="pro-title">{product.title}</h2>
          <div className="pro-rating">
            <span>
              {product.rating}/5 <MdOutlineStar />
            </span>
            <span>{product.availabilityStatus}</span>
          </div>

          <div className="pro-price-details">
            <h4>Price :</h4>
            <div className="prices">
              <span className="old-price">
                {(
                  product.price +
                  (product.price * product.discountPercentage) / 100
                ).toFixed(2)}
                $
              </span>
              <span className="pro-price">{product.price}$</span>
            </div>
          </div>
          <div className="product-status">
            <div className="product-stock">
              <h4>
                <FaBox className="stock-icon" /> Stock:
              </h4>
              <span>{product.stock} items left</span>
            </div>
            <div className="product-warranty">
              <h4>
                <FaShieldAlt className="warranty-icon" /> Warranty:
              </h4>
              <span>{product.warrantyInformation}</span>
            </div>
            <div className="product-shipping">
              <h4>
                <FaTruck className="shipping-icon" /> Shipping:
              </h4>
              <span>{product.shippingInformation}</span>
            </div>
          </div>

          <div className="pro-buttons">
            <Link to={`/update-product/${product.id}`} className="Link">
              <button className="update-button">
                <MdEdit /> Edit Product
              </button>
            </Link>
            <button
              onClick={() => handleDelete(product.id)}
              className="delete-button"
            >
              <MdDelete /> Delete Product
            </button>
          </div>
        </div>
      </div>

      <hr />

      <div className="bottom-section">
        <div className="pro-desc">
          <h1>Product Details</h1>
          <h2>Product Description:</h2>
          <p>{product.description}</p>
        </div>

        <div className="pro-images">
          <h2>Product Features:</h2>
          <ul>
            {product.features && product.features.length > 0 ? (
              product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))
            ) : (
              <li>No features available</li>
            )}
          </ul>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews:</h2>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="review-header">
                <div className="reviewer-profile">
                  <div className="profile-picture">
                    {getInitials(review.reviewerName)}
                  </div>
                  <h4>{review.reviewerName}</h4>
                </div>
                <span className="review-date">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <div className="review-rating">
                <span>{review.rating}/5</span>
                <MdOutlineStar />
              </div>
              <p>{review.comment}</p>
              <p className="review-email">
                Reviewed by: {review.reviewerEmail}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
