import { useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import Login from "./components/Login";
import ProductUpload from "./pages/ProductUpload";
import ProductsDetail from "./pages/ProductsDetail";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/signup"];
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);
  return (
    <div>
      {!hideHeaderPaths.includes(location.pathname) && (
        <Header openLogin={openLogin} />
      )}
      <Login isOpen={isLoginOpen} onClose={closeLogin} />
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route element={<PrivateRoute />}>
          <Route path="/product-upload" element={<ProductUpload />} />
          <Route path="/product" element={<ProductsDetail />} />
        </Route>
        <Route path="/product/:id" element={<ProductsDetail />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
