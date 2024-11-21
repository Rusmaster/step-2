import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";

interface ProtectedRouteProps {
  children: JSX.Element | JSX.Element[]; // Измените тип children, чтобы поддерживать несколько элементов
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { accessToken } = useSelector((state: RootState) => state.user);

  if (!accessToken) {
    return <Navigate to="/register" replace />;
    
  }

  return <>{children}</>; // Оборачиваем children в React.Fragment
};

export default ProtectedRoute;