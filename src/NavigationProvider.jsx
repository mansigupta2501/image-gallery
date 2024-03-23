import { Route, Routes } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import CategoryPage from "./components/CategoryPage";
import App from "./App"

function NavigationProvider() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<ImageGallery />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route exact path="*" element={<ImageGallery />} />
      </Routes>
    </>
  );
}

export default NavigationProvider;
