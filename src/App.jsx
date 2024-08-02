import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "./components/Header";
import "./App.css";
import Main from "./pages/Main";
import ProductUpload from "./pages/ProductUpload";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/product-upload" element={<ProductUpload />} />
      </Routes>
      <Button className="bg-primary text-white hover:bg-primary-dark">
        Primary Button
      </Button>
      <Button className="bg-secondary text-black hover:bg-secondary-dark">
        Secondary Button
      </Button>
      <Button variant="default">Primary Button</Button>
    </Router>
  );
}

export default App;
