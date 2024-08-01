import { useLocation, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import Login from "./pages/Login";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";

function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/signup"];
  return (
    <div>
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
