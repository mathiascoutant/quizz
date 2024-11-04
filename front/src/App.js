import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import QuizzPage from "./pages/QuizzPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DiscountPage from "./pages/DiscountPage";
import ProfilePage from "./pages/ProfilePage";
import "./index.css";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = ["/quizz", "/login", "/register"].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="App flex flex-col min-h-screen">
      {!hideHeaderFooter && <Header />}
      <div className={`flex-grow ${!hideHeaderFooter ? "pt-16" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quizz" element={<QuizzPage />} />
          <Route path="/register" element={<RegisterPage />} />
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
