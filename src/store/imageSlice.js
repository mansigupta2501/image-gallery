// imagesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchImages = createAsyncThunk('images/fetchImages', async ({ searchQuery, selectedCategory }) => {
  const apiUrl = `https://api.unsplash.com/search/collections/?client_id=ClhSBszg6lJgKIMD09FE7JJ_OyQuwoIl73xNmdkvRPU&page=2&query=${searchQuery}&query=${selectedCategory}&per_page=20`;

  const response = await fetch(apiUrl);
  const data = await response.json();
  
  return data.results.map(image => ({
    id: image.id,
    src: image.cover_photo ? image.cover_photo.urls.small : '',
    alt: image.alt_description,
    width: image.cover_photo ? image.cover_photo.width : 0,
    height: image.cover_photo ? image.cover_photo.height : 0,
    createdAt: image.published_at,
  }));
});

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    hoveredImage: null,
    searchQuery: '',
    selectedCategory: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setHoveredImage(state, action) {
      state.hoveredImage = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setHoveredImage, setSearchQuery, setSelectedCategory } = imagesSlice.actions;

export default imagesSlice.reducer;