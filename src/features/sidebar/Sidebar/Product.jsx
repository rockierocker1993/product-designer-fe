import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductItem } from "../../../store/components/AddCanvasItemSlice";
import { fetchProductsList } from "../../../api/productsApi";
import { SidebarPanelShell, SidebarGridState } from "./components";
import { useLoadableData } from "../../../hooks";

const Product = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: products,
    loading,
    error,
    reload: loadProducts,
  } = useLoadableData(fetchProductsList);

  const handleProductClick = (productId) => {
    dispatch(addProductItem(`product-${productId}`));
  };

  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const footerText = !loading && !error && products.length > 0
    ? `Showing ${filteredProducts.length} of ${products.length} products`
    : null;

  return (
    <SidebarPanelShell
      title="Products"
      subtitle="Click to add product"
      searchPlaceholder="Search products..."
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      footer={footerText}
    >
      <div className="items-grid">
        <SidebarGridState
          loading={loading}
          loadingText="Loading products..."
          error={error}
          onRetry={loadProducts}
          empty={!loading && !error && filteredProducts.length === 0}
          emptyText="No products found"
        />

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
    </SidebarPanelShell>
  );
};

export default Product;