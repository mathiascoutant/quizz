import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';
import './index.css';
import { Layout } from './layouts/Layout';
import DiscountPage from './pages/DiscountPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import QuizzPage from './pages/QuizzPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isQuizzPage = location.pathname.includes('/quizz');

  return (
    <div className="App flex flex-col min-h-screen">
      <Layout isQuizzPage={isQuizzPage}>
        <div className={`flex-grow ${!isQuizzPage ? 'pt-16' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quizz" element={<QuizzPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/discount" element={<DiscountPage />} />
          </Routes>
        </div>
      </Layout>
    </div>
  );
}

export default App;
