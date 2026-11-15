import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { ImageUpload } from "../../../components/ImageUpload";
import { CategoryFilter } from "../../../components/CategoryFilter";

const LeftbarPanelShell = ({
  search,
  categoryFilter,
  uploadImage,
  children,
  footer,
}) => {
 
  const searchBar = search && (
    <div className="sidebar-wrapper">
      <input
        type="text"
        className="sidebar-search-input"
        placeholder={search.placeholder || "Search..."}
        value={search.searchTerm}
        onChange={(event) => search.setSearchTerm(event.target.value)}
      />
      <Search size={20} className="sidebar-search-icon" />
    </div>
  );

  const uploadImageBar = uploadImage && (
    <ImageUpload
      onProgress={uploadImage.onProgress}
      onUpload={uploadImage.onUpload}
      onSuccess={uploadImage.onSuccess}
      onFailed={uploadImage.onFailed}
    />
  );

  const categoryFilterBar = categoryFilter && (
    <CategoryFilter
    categoryName={categoryFilter.categoryName}
    selectedCategory={categoryFilter.selectedCategory}
    handleCategoryChange={categoryFilter.handleCategoryChange}
    />
  );
  
  // Category filters
  return (
    <div className="col column menu-detail">
      <div className="sidebar-content">
        {searchBar ? searchBar : null}
        {uploadImageBar ? uploadImageBar : null}
        {categoryFilterBar ? categoryFilterBar : <><div>tak ada</div></>}
        {children}
        {footer ? <div className="sidebar-footer">{footer}</div> : null}
      </div>
    </div>
  );
};

export default LeftbarPanelShell;
