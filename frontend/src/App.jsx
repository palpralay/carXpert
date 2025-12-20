import Navbar from "./common/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Allcars from "./pages/Allcars";
import Footer from "./common/Footer";
import ScrollToTop from "./common/ScrollToTop";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 p-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-cars" element={<Allcars />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
