import { Search } from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { CategoryFilter } from "./CategoryFilter";

const PanelShell = ({
  search,
  customAction,
  categoryFilter,
  uploadImage,
  children,
  footer,
}) => {

  const searchBar = search && (
    <div className="input-search">
      <span className="input-search-icon"><Search size={16} /></span>
      <input
        type="text"
        placeholder={search.placeholder || "Search..."}
        value={search.searchTerm}
        onChange={(event) => search.setSearchTerm(event.target.value)}
      />
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
      categoryItems={categoryFilter.categoryItems}
      setCategoryItems={categoryFilter.setCategoryItems}
    />
  );

  // Category filters
  return (
    <div className="col sidebar-container">
      <div className="sidebar-content">
        <div className="section-body">
          <div className="section">
            {searchBar ? searchBar : null}
            {uploadImageBar ? uploadImageBar : null}
            {customAction ? customAction : null}
          </div>
        </div>
        {categoryFilterBar ? categoryFilterBar : <><div>tak ada</div></>}
        {children}
        {footer ? <div className="sidebar-footer">{footer}</div> : null}
      </div>
    </div>
  );
};

export default PanelShell;
