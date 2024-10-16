import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import QuizzPage from './pages/QuizzPage';
import RegisterPage from './pages/RegisterPage';
import './index.css';

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
      {!isQuizzPage && <Header />}
      <div className={`flex-grow ${!isQuizzPage ? 'pt-16' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quizz" element={<QuizzPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
      {!isQuizzPage && <Footer />}
    </div>
  );
}

export default App;
