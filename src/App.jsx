
// src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Ministries from "./components/Ministries";
import NewsEvents from "./components/NewsEvents";
import Login from "./components/Login";
import Register from "./components/Register";
import Forms from "./components/Forms";
import Payments from "./components/Payments";
import CheckoutPage from "./components/Checkout";

import NewsEventsPage from "./pages/NewsEventsPage";
import DonationPage from "./pages/DonationPage";
import AboutPage from "./pages/AboutPage";
import Serve from "./components/Serve";
import ServePage from "./pages/ServePage";

import ChurchMembershipForm from "./components/ChurchMembershipForm";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NewsEventDetail from "./pages/NewsEventDetailPage";
import AdminRoutes from "./components/AdminDashboard/AdminRoutes";
import FinanceRoutes from "./components/Finance/routesFinanceRoutes";
import MemberRoutes from "./components/member/routes/MemberRoutes";

import MediaGallery from "./pages/Media&Resources/MediaGallery";
import MediaResources from "./pages/Media&Resources/Resources";
import FormsPage from "./pages/sections/FormsPage";

export default function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dash/");

  return (
    <div className="app-container">
      {!isDashboardRoute && <Header />}

      <main className="main-content">
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/about-us/details" element={<AboutPage />} />
          <Route path="/ministries" element={<Ministries />} />

          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/news-events/:category" element={<NewsEventsPage />} />
           <Route path ="/news-events/:category/:id" element ={<NewsEventDetail />} />
          

          <Route path="/serve" element={<Serve />} />
          <Route path="/serve-details" element={<ServePage />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/forms/church-membership-form" element={<ChurchMembershipForm />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/forms-payments/donation" element={<DonationPage />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* DASHBOARDS */}
          <Route path="/dash/admin/*" element={<AdminRoutes />} />
          <Route path="/dash/finance/*" element={<FinanceRoutes />} />
          <Route path="/dash/membership/*" element={<MemberRoutes />} />

          {/* Media */}
          <Route path="/more/media-gallery" element={<MediaGallery />} />
          <Route path="/more/resources" element={<MediaResources />} />
          <Route path="/forms-page" element={<FormsPage />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isDashboardRoute && <Footer />}
    </div>
  );
}