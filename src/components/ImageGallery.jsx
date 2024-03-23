import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@mui/material';
import { fetchImages, setHoveredImage, setSearchQuery, setSelectedCategory } from '../store/imageSlice';

const ImageGallery = () => {
  const dispatch = useDispatch();
  const { images, hoveredImage, searchQuery, selectedCategory } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchImages({ searchQuery, selectedCategory }));
  }, [dispatch, searchQuery, selectedCategory]);

  const categories = ['Mountains', 'Beaches', 'Birds', 'Food'];
  const rows = [];
  for (let i = 0; i < images.length; i += 5) {
    rows.push(images.slice(i, i + 5));
  }

  const handleMouseEnter = (imageId) => {
    const hoveredImg = images.find(image => image.id === imageId);
    dispatch(setHoveredImage(hoveredImg));
  };
  
  const handleMouseLeave = () => {
    dispatch(setHoveredImage(null));
  };
  
  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };
  
  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
  };
  // Remaining code for rendering the image gallery

  return (
    // <h1>Hello</h1>
    // Render the image gallery using Redux state
    <div
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '200vh',
    }}
  >
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: 'red' }}>Image Gallery</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <button onClick={() => setSearchQuery('')}>Clear Search</button>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            style={{
              margin: '5px',
              backgroundColor: selectedCategory === category ? 'green' : '#001f3f',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              padding: '10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {category}
          </button>
        ))}
      </div>
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
  </div>
    );
};

export default ImageGallery;
