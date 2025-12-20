import Navbar from "./common/Navbar";
import { Routes, Route } from "react-router-dom";
import MainBanner from "./components/MainBanner";
import SelectCarImageLogo from "./pages/SelectCarImageLogo";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 p-0">
        <Routes>
          <Route path="/" element={<MainBanner />} />
          <Route path="/select-car" element={<SelectCarImageLogo />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
