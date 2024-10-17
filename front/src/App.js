import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import './index.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import QuizzPage from './pages/QuizzPage';
import RegisterPage from './pages/RegisterPage';
import { ProtectedRoute } from './router/ProtectedRoutes';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideHeaderFooter = ['/quizz', '/login', '/register'].some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="App flex flex-col min-h-screen">
      {!hideHeaderFooter && <Header />}
      <div className={`flex-grow ${!hideHeaderFooter ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/quizz"
            element={
              <ProtectedRoute>
                <QuizzPage />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
