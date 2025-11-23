import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addProductItem } from "../../../store/components/AddCanvasItemSlice";
import { fetchProductsList } from "../../../api/productsApi";
import '../../../assets/css/sidebar.css';

const Product = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductsList();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    dispatch(addProductItem(`product-${productId}`));
  };

  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="col column menu-detail">
    <div className="sidebar-content">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Products</h3>
        <p className="sidebar-subtitle">Click to add product</p>
      </div>

      {/* Search Bar */}
      <div className="sidebar-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </div>

      {/* Products Grid */}
      <div className="items-grid">
        {loading && (
          <div className="grid-message">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        )}

        {error && (
          <div className="grid-message error">
            <p>Error: {error}</p>
            <button onClick={loadProducts} className="retry-btn">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="grid-message">
            <p>No products found</p>
          </div>
        )}

        {!loading && !error && filteredProducts.map((product) => (
          <div
            key={product.id}
            className="grid-item"
            onClick={() => handleProductClick(product.id)}
            title={product.name}
          >
            <div className="item-preview">
              {product.thumbnail ? (
                <img src={product.thumbnail} alt={product.name} />
              ) : (
                <div className="item-placeholder">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              )}
            </div>
            <div className="item-name">{product.name}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {!loading && !error && products.length > 0 && (
        <div className="sidebar-footer">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      )}
    </div>
    </div>
  );
};

export default Product;