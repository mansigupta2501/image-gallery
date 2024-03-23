import { Route, Routes } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import CategoryPage from "./components/CategoryPage";

function NavigationProvider() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<ImageGallery />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </>
  );
}

export default NavigationProvider;
