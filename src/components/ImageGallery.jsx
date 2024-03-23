import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Modal, Button } from "@mui/material";
import {
  fetchImages,
  setHoveredImage,
  setSearchQuery,
  setSelectedCategory,
  setBigImage,
  clearBigImage,
} from "../store/imageSlice";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const ImageGallery = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [allCategories] = useState("beach,mountains,birds,food");
  const { images, hoveredImage, searchQuery, selectedCategory, bigImage } =
    useSelector((state) => state.images);

  useEffect(() => {
    if (allCategories && !searchQuery) {
      dispatch(fetchImages({ query: allCategories }));
    }
  }, [allCategories, dispatch]);

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchImages({ query: searchQuery }));
    }
  }, [dispatch, searchQuery]);

  const categories = ["Mountains", "Beaches", "Birds", "Food"];

  const handleMouseEnter = (imageId) => {
    const hoveredImg = images.find((image) => image.id === imageId);
    dispatch(setHoveredImage(hoveredImg));
  };

  const handleMouseLeave = () => {
    dispatch(setHoveredImage(null));
  };
  const handleDownload = () => {
    if (bigImage) {
      window.open(bigImage, "_blank");
    }
  };

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleResetSearchQuery = () => {
    dispatch(setSearchQuery(""));
  };

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
    navigateTo(`/category/${category}`);
  };

  const handleImageClick = (imageUrl) => {
    dispatch(setBigImage(imageUrl));
  };

  const handleCloseModal = () => {
    dispatch(clearBigImage());
  };

  return (
    <div
      style={{
        filter: bigImage ? "blur(5px)" : "none", // Apply blur if modal is open
      }}
    >
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center", color: "red" }}>Image Gallery</h1>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <button onClick={() => handleResetSearchQuery()}>Clear Search</button>
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{
                margin: "5px",
                backgroundColor:
                  selectedCategory === category ? "green" : "#001f3f",
                color: "white",
                fontWeight: "bold",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {category}
            </button>
          ))}
        </div>
        {images.length > 0 ? (
          <div className="image-grid">
            <Grid container justifyContent="center" spacing={2}>
              {images.map((image) => (
                <Grid
                  key={image.id}
                  item
                  xs={12} // Display one column on extra-small screens
                  sm={4} // Display two columns on small screens
                  md={3} // Display three columns on medium screens
                  lg={2} // Display four columns on large screens
                  xl={2} // Display six columns on extra-large screens
                >
                  <div style={{ position: "relative" }}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      style={{
                        width: "200px",
                        height: "120px",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                      onMouseEnter={() => handleMouseEnter(image.id)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleImageClick(image.src)} // Open modal on image click
                    />
                    {hoveredImage && hoveredImage.id === image.id && (
                      <div
                        style={{
                          position: "absolute",
                          background: "rgba(0, 0, 0, 0.7)",
                          color: "white",
                          padding: "5px",
                          borderRadius: "5px",
                          transition: "transform 0.3s",
                          zIndex: "1",
                          width: "200px",
                          height: "90px",
                          top: "123px",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      >
                        <p style={{ margin: "5px 0" }}>
                          {hoveredImage.width} x {hoveredImage.height}
                        </p>
                        <p style={{ margin: "5px 0" }}>
                          Published At:{" "}
                          {new Date(hoveredImage.createdAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : (
          <p style={{ color: "white" }}>No Results Found</p>
        )}
      </div>
      {bigImage && (
        <Modal
          open={true}
          onClose={handleCloseModal}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ background: "#fff", padding: "20px" }}>
            <img
              src={bigImage}
              alt="Big Image"
              style={{
                maxWidth: "75vw",
                maxHeight: "75vh",
                objectFit: "contain",
              }}
            />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                variant="contained"
                onClick={handleDownload}
                style={{ marginRight: "10px" }}
              >
                Download
              </Button>
              <Button variant="contained" onClick={handleCloseModal}>
                <CloseIcon />
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageGallery;
