import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Modal, Button } from "@mui/material";
import {
  fetchImagesByCategory,
  setHoveredImage,
  setBigImage,
  setSelectedCategory,
  clearBigImage,
} from "../store/imageSlice";
import CloseIcon from "@mui/icons-material/Close";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { imagesByCategory, selectedCategory, hoveredImage, bigImage } =
    useSelector((state) => state.images);
  const categories = ["Mountains", "Beaches", "Birds", "Food"];

  useEffect(() => {
    dispatch(fetchImagesByCategory({ selectedCategory }));
  }, [dispatch, selectedCategory]);

  const handleMouseEnter = (imageId) => {
    const hoveredImg = imagesByCategory.find((image) => image.id === imageId);
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

  const handleImageClick = (imageUrl) => {
    dispatch(setBigImage(imageUrl));
  };

  const handleCloseModal = () => {
    dispatch(clearBigImage());
  };

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
    navigateTo(`/category/${category}`);
  };
  const handleBackBtnClick = () => {
    navigateTo('/image-gallery');
  };

  return (
    <div
      style={{
        filter: bigImage ? "blur(5px)" : "none", // Apply blur if modal is open
      }}
    >
        <Button variant="contained" onClick={handleBackBtnClick}>Back to Homepage</Button>
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center", color: "red" }}>
          {categoryName} Images
        </h1>

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
        {imagesByCategory.length > 0 ? (
          <div className="image-grid">
          <Grid container justifyContent="center" spacing={2}>
            {imagesByCategory.map((image) => (
              <Grid
                key={image.id}
                item
                xs={12} // Display one column on extra-small screens
                sm={4}  // Display two columns on small screens
                md={3}  // Display three columns on medium screens
                lg={2}  // Display four columns on large screens
                xl={2}  // Display six columns on extra-large screens
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    style={{
                        width: "200px",
                        height: "120px",
                        margin: "5px",
                      cursor: "pointer"
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

export default CategoryPage;
