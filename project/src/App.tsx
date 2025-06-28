import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPanelPage from './pages/AdminPanelPage';
import Layout from './components/Layout';
import HomePage from './components/homepage/HomePage';
import ReviewsPage from './components/reviews/ReviewsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboard - No Layout */}
        <Route path="/" element={<DashboardPage />} />
        
        {/* Admin routes - No Layout */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        
        {/* Pages with Layout */}
        <Route path="/home" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/services" element={
          <Layout>
            <ServicesPage />
          </Layout>
        } />
        <Route path="/reviews" element={
          <Layout>
            <ReviewsPage />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;