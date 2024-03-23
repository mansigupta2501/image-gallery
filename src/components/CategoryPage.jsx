// CategoryPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages, setHoveredImage, setSearchQuery, setSelectedCategory } from '../store/imageSlice';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const dispatch = useDispatch();
  const { images, hoveredImage, searchQuery, selectedCategory } = useSelector((state) => state.images);

    dispatch(setSearchQuery(categoryName));   
//   const categoryName = match.params.categoryName;
  // Fetch images based on the category
  // Implement useEffect hook to fetch images based on the category
  // Update component state with fetched images
  return (
    <div>
      <h1>Category: {categoryName}</h1>
      {/* Display images based on the fetched data */}
    </div>
  );
};

export default CategoryPage;
