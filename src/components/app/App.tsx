import React from "react";
import { Provider } from "react-redux";
import store from "../../services/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "../AppHeader";
import BurgerIngredients from "../Burger/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../Burger/BurgerConstructor/BurgerConstructor";
import Login from "../pages/Login/Login";
import HomePage from "../pages/HomePage/HomePage";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Profile from "../pages/Profile";
import ForgotPasswordTwo from "../pages/ForgotPasswordTwo";
import OrdersProfile from "../pages/Profile/OrdersProfile/OrdersProfile";
import IngredientPage from "../pages/IngredientPage/IngredientPage";
import ProtectedRoute from "../../utils/ProtectedRoute";
import ProfileHome from "../pages/Profile/ProfileHome";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            {/* Маршрут для главной страницы с заголовком */}
            <Route path="/" element={<AppHeader />}>
              {/* Главная страница */}
              <Route index element={<HomePage />} />

              {/* Страница ингредиента */}
              <Route path="ingredients/:id" element={<IngredientPage />} />

              {/* Маршруты для аутентификации */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password-2" element={<ForgotPasswordTwo />} />
              <Route path="reset-password" element={<ResetPassword />} />

              {/* Защищенные маршруты для профиля */}
              <Route
                path="profile/*"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              >
                <Route path="" element={<ProfileHome />} />
                <Route path="orders" element={<OrdersProfile />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
