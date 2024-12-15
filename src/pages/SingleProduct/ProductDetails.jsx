import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdEdit, MdOutlineStar, MdArrowBack } from "react-icons/md";
import { FaBox, FaShieldAlt, FaTruck } from "react-icons/fa";
import { getProduct, deleteProduct } from "../../Config/actions";
import Modal from "../../components/Modal/Modal";
import UpdateProduct from "../../components/AddAndUpdate/UpdateProduct";
import Spinner from "../../components/Spinner/Spinner";
import ConfirmDialog from "../../components/Confirm Dialog/ConfirmDialog";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProduct: product, loading } = useSelector((state) => state);
  const [imgIndex, setImgIndex] = useState(0);
  const [loadingTimeout, setLoadingTimeout] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProduct(id));
    setLoadingTimeout(false);
  }, [dispatch, id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openConfirmDialog = () => setIsConfirmDialogOpen(true);
  const closeConfirmDialog = () => setIsConfirmDialogOpen(false);

  const getInitials = (name) => {
    const nameArr = name.split(" ");
    const initials = nameArr[0][0] + nameArr[1][0];
    return initials.toUpperCase();
  };

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
    navigate("/products");
  };

  if (loading || loadingTimeout) return <Spinner />;

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
                <img key={index} src={image} alt="" onClick={() => setImgIndex(index)} />
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
            <span> {product.rating}/5 <MdOutlineStar /> </span>
            <span>{product.availabilityStatus}</span>
          </div>

          <div className="pro-price-details">
            <h4>Price :</h4>
            <div className="prices">
              <span className="old-price">
                {((Number(product.price) || 0) + (Number(product.price) * (Number(product.discountPercentage) || 0)) /100).toFixed(2)}$
              </span>
              <span className="pro-price">{product.price}$</span>
            </div>
          </div>
          <div className="product-status">
            <div className="product-stock">
              <h4><FaBox className="stock-icon" /> Stock:</h4>
              <span>{product.stock} items left</span>
            </div>
            <div className="product-warranty">
              <h4><FaShieldAlt className="warranty-icon" /> Warranty:</h4>
              <span>{product.warrantyInformation}</span>
            </div>
            <div className="product-shipping">
              <h4><FaTruck className="shipping-icon" /> Shipping:</h4>
              <span>{product.shippingInformation}</span>
            </div>
          </div>

          <div className="pro-buttons">
            <button onClick={openModal} className="update-button">
              <MdEdit /> Edit Product</button>
            <button onClick={openConfirmDialog} className="delete-button">
              <MdDelete /> Delete Product</button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UpdateProduct product={product} onClose={closeModal} />
      </Modal>

      <hr />

      <div className="bottom-section">
        <div className="pro-desc">
          <h1>Product Description:</h1>
          <p>{product.description}</p>
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

      {isConfirmDialogOpen && (
        <ConfirmDialog
          message="Are you sure you want to delete this product?"
          onConfirm={handleDelete}
          onCancel={closeConfirmDialog}
        />
      )}
    </div>
  );
}

export default ProductDetails;
