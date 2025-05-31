import React from "react";
import "../styles/NewsCategoryFilter.css";

const NewsCategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="NewsCategoryFilter-container">
      <label htmlFor="categoryFilter">Lọc theo loại tin:</label>
      <select
        id="categoryFilter"
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value="">Tất cả</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default NewsCategoryFilter;
