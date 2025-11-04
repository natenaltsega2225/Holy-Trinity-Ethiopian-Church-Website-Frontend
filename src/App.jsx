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
import DonationPage from "./pages/DonationPage"
import MonthlyPaymentPage from "./pages/MonthlyPaymentPage";
// import HolyBible from "./pages/ministries/HolyBible";
// import Sermons from "./pages/ministries/Sermons";
// import DeaconsClass from "./pages/ministries/DeaconsClass";

// ✅ New replacements
import Forms from "./components/Forms";
import Payments from "./components/Payments";

import KidsSummerProgram from "./pages/forms/KidsSummerProgram";
import ArkEncounter from "./pages/forms/ArkEncounter";
import ChurchMembershipForm from "./components/ChurchMembershipForm";

import AboutPage from "./pages/AboutPage";
import Serve from "./components/Serve";
import ServePage from "./pages/ServePage";

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
          <Route path="/about-us/details" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* ✅ Serve Section + Dedicated Page */}
          <Route path="/serve" element={<Serve />} />
          <Route path="/serve-details" element={<ServePage />} />

          {/* Login & Register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ministries */}
          <Route path="/ministries" element={<Ministries />} />
          {/* <Route path="/ministries/holy-bible" element={<HolyBible />} /> */}
          {/* <Route path="/ministries/sermons" element={<Sermons />} /> */}
          {/* <Route path="/ministries/deacons-class" element={<DeaconsClass />} /> */}

          {/* News & Events */}
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/news-events/details" element={<NewsEventsPage />} />

          {/* ✅ Forms & Payments (new structure) */}
          <Route path="/forms" element={<Forms />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/forms-payments/donation" element={<DonationPage />} />
          <Route path="/forms-payments/monthly-payment" element={<MonthlyPaymentPage />} />

          {/* Individual Form Pages */}
          <Route path="/forms/kids-summer-program" element={<KidsSummerProgram />} />
          <Route path="/forms/ark-encounter" element={<ArkEncounter />} />
          <Route path="/forms/church-membership-form" element={<ChurchMembershipForm />} />

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
