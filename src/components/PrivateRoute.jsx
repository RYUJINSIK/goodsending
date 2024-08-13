import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Warning from "./Warning";

function PrivateRoute() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showWarning, setShowWarning] = useState(false);
  const openWarning = () => setShowWarning(true);

  const handleCloseModal = () => {
    setShowWarning(false);
    navigate("/");
  };

  if (!isAuthenticated && !showWarning) {
    setShowWarning(true);
  }

  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Warning isOpen={openWarning} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default PrivateRoute;
