import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// PAGES / COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import Ministries from "./components/Ministries";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import NewsEvents from "./components/NewsEvents";
import NewsEventsPage from "./pages/NewsEventsPage";
import Login from "./components/Login";
import Register from "./components/Register";
import DonationPage from "./pages/DonationPage";
import MonthlyPaymentPage from "./pages/MonthlyPaymentPage";

import Forms from "./components/Forms";
import Payments from "./components/Payments";

import KidsSummerProgram from "./pages/KidsSummerProgram";
import CurrentTripPage from "./pages/CurrentTripPage"; // Updated

import AboutPage from "./pages/AboutPage";
import Serve from "./components/Serve";
import ServePage from "./pages/ServePage";
import FormsPage from "./pages/FormsPage";

import MediaGallery from "./pages/Media&Resources/MediaGallery";
import Resources from "./pages/Media&Resources/Resources";

const App = () => {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Routes>
          {/* Home & About */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us/details" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* Serve Section */}
          <Route path="/serve" element={<Serve />} />
          <Route path="/serve-details" element={<ServePage />} />

          {/* Login & Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ministries */}
          <Route path="/ministries" element={<Ministries />} />

          {/* News & Events */}
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/news-events/details" element={<NewsEventsPage />} />
          {/* <Route path="/news-events/:sectionId" element={<NewsEventsPage />} /> */}

          {/* Forms & Payments */}
          <Route path="/forms" element={<Forms />} />
          <Route path="/forms-page" element={<FormsPage />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/forms-payments/donation" element={<DonationPage />} />
          <Route path="/forms-payments/monthly-payment" element={<MonthlyPaymentPage />} />

          {/* Individual Form Pages */}
          <Route path="/forms/kids-summer-program" element={<KidsSummerProgram />} />
          <Route path="/forms/church-membership-form" element={<Forms />} />

          {/* 🎯 Dynamic Trip Route */}
          <Route path="/trip/current" element={<CurrentTripPage />} />



          {/* More */}
          <Route path="/more/media-gallery" element={<MediaGallery />} />
          <Route path="/more/resources" element={<Resources />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
