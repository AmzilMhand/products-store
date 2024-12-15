import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdAddCircle, MdAddShoppingCart  } from "react-icons/md";
import { getProducts, getCategories, setVisibleCount, setFilteredProducts } from "../../Config/actions";
import "./ProductsList.css";
import AddProduct from "../../components/AddAndUpdate/AddProduct";
import Spinner from "../../components/Spinner/Spinner";

function ProductsList() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories || []);
  const allProducts = useSelector((state) => state.products || []);
  const filteredProducts = useSelector((state) => state.filteredProducts || []);
  const loading = useSelector((state) => state.loading || false);
  const visibleCount = useSelector((state) => state.visibleCount || 15);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const filterProducts = () => {
      const products =
        selectedCategory === "all" ? allProducts: allProducts.filter(
              (product) => product.category === selectedCategory);
      dispatch(setFilteredProducts(products));
    };

    filterProducts();
  }, [selectedCategory, allProducts, dispatch]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleShowMore = () => {
    dispatch(setVisibleCount(visibleCount + 15));
  };

  if (loading) return <Spinner />;

  return (
    <div className="pro-container">

      <div className="products-head">
        <div className="categories-dropdown">
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.slug || category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => setIsAddProductModalOpen(true)} className="add">
          <MdAddCircle />
          Add Product
        </button>
      </div>

      <AddProduct isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)} />

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <h2>No products found</h2>
          <p>Current Category: {selectedCategory}</p>
        </div>
      ) : (
        <>
          <div className="products">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <div className="product" key={product.id}>
                <Link to={`/product/${product.id}`} className="product-link">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-img">
                        <img
                          src={product.images?.[0] || ""}
                          alt={product.title || "Product"}
                          loading="lazy"
                        />
                      </div>
                      <div className="card-content">
                        <span className="card-category">
                          {product.category || "Unknown"}
                        </span>
                        <h5 className="card-title">{product.title || "Untitled Product"}</h5>
                        <div className="card-bottom">
                          <p className="card-price">${product.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="card-buttons">
                  <button className="addtocart-button">
                    <MdAddShoppingCart />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length > visibleCount && (
            <div className="show-more">
              <button onClick={handleShowMore}>Show More</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductsList;
