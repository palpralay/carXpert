import Navbar from "./common/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Allcars from "./pages/Allcars";
import Footer from "./common/Footer";
import ScrollToTop from "./common/ScrollToTop";
import AllService from "./pages/AllService";
import ProtectedRoute from "./routes/ProtectedRoute";
import CustomerDashboard from "./pages/CustomerDashboard";
import MechanicDashboard from "./pages/MechanicDashboard";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 p-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-cars" element={<Allcars />} />
          <Route path="/all-services" element={<AllService />} />

          <Route element={<ProtectedRoute allowedRole="customer" />}>
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="mechanic" />}>
            <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
