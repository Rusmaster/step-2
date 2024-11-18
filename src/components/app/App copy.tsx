import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "../../services/store";
import BurgerIngredients from "../Burger/BurgerIngredients/BurgerIngredients";
import DndContext from "./../../DndContext";
import BurgerConstructor from "../Burger/BurgerConstructor/BurgerConstructor";
import { Product } from "./../../types/Product";
import styles from "./styles.module.css";
import AppHeader from "../AppHeader";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Login from "../pages/Login/Login";
import HomePage from "../pages/HomePage/HomePage";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import ForgotPasswordTwo from "../pages/ForgotPasswordTwo";
import OrdersProfile from "../pages/Profile/OrdersProfile/OrdersProfile";



function App() {
 

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <AppHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password-2" element={<ForgotPasswordTwo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="profile/*" element={<Profile />}>
              <Route path="orders" element={<OrdersProfile />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
