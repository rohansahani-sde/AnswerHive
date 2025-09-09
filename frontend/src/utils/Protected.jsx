import React from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar user authenticated hai to jo bhi route ka component hoga wo dikhe
  return children;
};

export default Protected;
