// CategoryPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import { fetchImagesByCategory, setHoveredImage } from '../store/imageSlice';

const CategoryPage = () => {
    const { categoryName } = useParams();
    const dispatch = useDispatch();
  const { imagesByCategory, selectedCategory, hoveredImage } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchImagesByCategory({ selectedCategory }));
  }, [dispatch, selectedCategory]);

  const rows = [];
  for (let i = 0; i < imagesByCategory.length; i += 5) {
    rows.push(imagesByCategory.slice(i, i + 5));
  }

  const handleMouseEnter = (imageId) => {
    const hoveredImg = imagesByCategory.find(image => image.id === imageId);
    dispatch(setHoveredImage(hoveredImg));
  };
  
  const handleMouseLeave = () => {
    dispatch(setHoveredImage(null));
  };

  return (
    <div>
      <h1>Category: {categoryName}</h1>
      <div
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '200vh',
    }}
  >
    <div className="image-grid">
        <Grid container justifyContent="center" spacing={2}>
          {rows.map((row, rowIndex) => (
            <Grid key={rowIndex} container item xs={12} spacing={2} justifyContent="center">
              {row.map(image => (
                <Grid key={image.id} item onMouseEnter={() => handleMouseEnter(image.id)} onMouseLeave={handleMouseLeave}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      style={{ width: '150px', height: '150px', margin: '5px' }}
                    />
                    {hoveredImage && hoveredImage.id === image.id && (
                      <div
                        style={{
                          position: 'absolute',
                          background: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          padding: '5px',
                          transform: 'scale(0.8)',
                          borderRadius: '5px',
                          transition: 'transform 0.3s',
                          zIndex: '1',
                        }}
                      >
                        <p>Width: {hoveredImage.width}px</p>
                        <p>Height: {hoveredImage.height}px</p>
                        <p>Published At: {new Date(hoveredImage.createdAt).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </div>
  </div>
      {/* Display images based on the fetched data */}
    </div>
  );
};

export default CategoryPage;
