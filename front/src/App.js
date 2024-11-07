import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./index.css";
import { CategoriesPage } from "./pages/CategoriesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import QuizzPage from "./pages/QuizzPage";
import RegisterPage from "./pages/RegisterPage";
import { ProtectedRoute } from "./router/ProtectedRoutes";
import DiscountPage from "./pages/DiscountPage";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = ["/categories/", "/login", "/register"].some(
    (path) => location.pathname.startsWith(path)
  );

  return (
    <div className="App flex flex-col min-h-screen">
      {!hideHeaderFooter && <Header />}
      <div className={`flex-grow ${!hideHeaderFooter ? "pt-16" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/:category/quizz"
            element={
              <ProtectedRoute>
                <QuizzPage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/discount" element={<DiscountPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
