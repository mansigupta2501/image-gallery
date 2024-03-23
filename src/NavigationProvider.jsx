import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './components/Sidebar'
import ImageGallery from "./components/ImageGallery";
import CategoryPage from "./components/CategoryPage";

function NavigationProvider() {
  return (
    <>
    {/* <Sidebar /> */}
      <Routes>
        <Route exact path="/" element={<ImageGallery />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </>
  );
}

export default NavigationProvider;
