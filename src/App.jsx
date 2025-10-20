//src/app.jsx
// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// PAGES / COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import Ministries from "./components/ministries"
import Membership from "./components/Membership";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Serve from "./components/Serve";
import NewsEvents from "./components/NewsEvents";
import Auth from "./components/Auth";
import Login from "./components/Login";
import Register from "./components/Register";
import HolyBible from "./pages/ministries/HolyBible";
import Sermons from "./pages/ministries/Sermons";
// import SundaySchoolService from "./pages/ministries/SundaySchoolService";
import DeaconsClass from "./pages/ministries/DeaconsClass";
import KidsSummerProgram from "./pages/forms/KidsSummerProgram";
import ArkEncounter from "./pages/forms/ArkEncounter";
import ChurchMembershipForm from "./components/ChurchMembershipForm";
import Donation from "./components/Donation";

import PhotoAlbums from "./pages/more/PhotoAlbums";
import Resources from "./pages/more/Resources";

const App = () => {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Routes>
          {/* Home & About */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />

          {/* Serve */}
          <Route path="/serve" element={<Serve />} />
            {/* Login */}
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
          {/* Ministries */}
<Route path="/ministries" element={<Ministries />} />
          {/* News & Events */}
     <Route path="/news-events" element={<NewsEvents />} />

          {/* Forms & Payments */}
          <Route path="/forms-payments" element={<Membership />} />
          <Route path="/forms-payments/kids-summer-program" element={<KidsSummerProgram />} />
          <Route path="/forms-payments/ark-encounter" element={<ArkEncounter />} />
          <Route path="/forms-payments/church-membership-form" element={<ChurchMembershipForm />} />
          <Route path="/forms-payments/donation" element={<Donation />} />

          {/* More */}
          <Route path="/more/photo-albums" element={<PhotoAlbums />} />
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
