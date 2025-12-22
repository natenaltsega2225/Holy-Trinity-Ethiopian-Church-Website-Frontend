
// // src/App.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

// import Home from "./components/Home";
// import AboutUs from "./components/AboutUs";
// import Ministries from "./components/ministries.jsx";
// import NewsEvents from "./components/NewsEvents";   
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Forms from "./components/Forms";
// import Payments from "./components/Payments";
// import CheckoutPage from "./components/Checkout";
// import NewsEventsPage from "./pages/NewsEventsPage";
// import DonationPage from "./pages/DonationPage";
// import AboutPage from "./pages/AboutPage";
// import Serve from "./components/Serve";
// import ServePage from "./pages/ServePage";
// import KidsSummerProgram from "./pages/forms/KidsSummerProgram";
// import ArkEncounter from "./pages/forms/ArkEncounter";
// import ChurchMembershipForm from "./components/ChurchMembershipForm";
// import PhotoAlbums from "./pages/more/PhotoAlbums";
// import Resources from "./pages/more/Resources";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";

// import AdminRoutes from "./components/AdminDashboard/AdminRoutes";
// import FinanceRoutes from "./components/FinanceDashboard/FinanceRoutes";
// import MemberRoutes from "./components/MembershipDashoard/MemberRoutes";

// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <div className="app-container">
//       <Header />

//       <main className="main-content">
//         <Routes>
//           {/* ----- PUBLIC SITE (no login needed) ----- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about-us" element={<AboutUs />} />
//           <Route path="/about-us/details" element={<AboutPage />} />
//           <Route path="/ministries" element={<Ministries />} />

//           {/* News & Events public */}
//           <Route path="/news-events" element={<NewsEvents />} />
//           <Route path="/news-events/:category" element={<NewsEventsPage />} />

//           {/* Serve public */}
//           <Route path="/serve" element={<Serve />} />
//           <Route path="/serve-details" element={<ServePage />} />

//           {/* Forms & payments public */}
//           <Route path="/forms" element={<Forms />} />
//           <Route
//             path="/forms/kids-summer-program"
//             element={<KidsSummerProgram />}
//           />
//           <Route path="/forms/ark-encounter" element={<ArkEncounter />} />
//           <Route
//             path="/forms/church-membership-form"
//             element={<ChurchMembershipForm />}
//           />

//           {/* Donation public (can donate without login) */}
//           <Route path="/donate" element={<DonationPage />} />
//           <Route
//             path="/forms-payments/donation"
//             element={<DonationPage />}
//           />

//           <Route path="/payments" element={<Payments />} />
//           <Route path="/checkout" element={<CheckoutPage />} />

//           {/* Extra info pages */}
//           <Route path="/photo-albums" element={<PhotoAlbums />} />
//           <Route path="/resources" element={<Resources />} />

//           {/* ----- AUTH PAGES ----- */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />

//           {/* ----- DASHBOARDS (login required) ----- */}
//           <Route
//             path="/dash/admin/*"
//             element={
//               <ProtectedRoute roles={["admin"]}>
//                 <AdminRoutes />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/dash/finance/*"
//             element={
//               <ProtectedRoute roles={["finance", "admin"]}>
//                 <FinanceRoutes />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/dash/membership/*"
//             element={
//               <ProtectedRoute
//                 roles={["member", "member_mgr", "finance", "admin"]}
//               >
//                 <MemberRoutes />
//               </ProtectedRoute>
//             }
//           />

//           {/* Fallback */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </main>

//       <Footer />
//     </div>
//   );
// }


// // src/App.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import Header from "./components/Header";
// import Footer from "./components/Footer";

// import Home from "./components/Home";
// import AboutUs from "./components/AboutUs";
// import Ministries from "./components/Ministries";
// import NewsEvents from "./components/NewsEvents";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Forms from "./components/Forms";
// import Payments from "./components/Payments";
// import CheckoutPage from "./components/Checkout";

// import NewsEventsPage from "./pages/NewsEventsPage";
// import DonationPage from "./pages/DonationPage";
// import AboutPage from "./pages/AboutPage";
// import Serve from "./components/Serve";
// import ServePage from "./pages/ServePage";
// import KidsSummerProgram from "./pages/forms/KidsSummerProgram";
// import ArkEncounter from "./pages/forms/ArkEncounter";
// import ChurchMembershipForm from "./components/ChurchMembershipForm";
// import PhotoAlbums from "./pages/more/PhotoAlbums";
// import Resources from "./pages/more/Resources";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";

// import AdminRoutes from "./components/AdminDashboard/AdminRoutes";
// import FinanceRoutes from "./components/FinanceDashboard/FinanceRoutes";
// import MemberRoutes from "./components/MembershipDashoard/MemberRoutes";

// import ProtectedRoute from "./components/ProtectedRoute";
// import MediaGallery from "./pages/Media&Resources/MediaGallery";
// import Resources from "./pages/Media&Resources/Resources";
// import FormsPage from "./pages/FormsPage";

// export default function App() {
//   return (
//     <div className="app-container">
//       <Header />

//       <main className="main-content">
//         <Routes>
//           {/* ----- PUBLIC SITE (no login needed) ----- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about-us" element={<AboutUs />} />
//           <Route path="/about-us/details" element={<AboutPage />} />
//           <Route path="/ministries" element={<Ministries />} />

//           {/* News & Events public */}
//           <Route path="/news-events" element={<NewsEvents />} />
//           <Route path="/news-events/:category" element={<NewsEventsPage />} />

//           {/* Serve public */}
//           <Route path="/serve" element={<Serve />} />
//           <Route path="/serve-details" element={<ServePage />} />

//           {/* Forms & payments public */}
//           <Route path="/forms" element={<Forms />} />
//           <Route
//             path="/forms/kids-summer-program"
//             element={<KidsSummerProgram />}
//           />
//           <Route path="/forms/ark-encounter" element={<ArkEncounter />} />
//           <Route
//             path="/forms/church-membership-form"
//             element={<ChurchMembershipForm />}
//           />

//           {/* Donation public (can donate without login) */}
//           <Route path="/donate" element={<DonationPage />} />
//           <Route
//             path="/forms-payments/donation"
//             element={<DonationPage />}
//           />

//           <Route path="/payments" element={<Payments />} />
//           <Route path="/checkout" element={<CheckoutPage />} />

//           {/* Extra info pages */}
//           <Route path="/photo-albums" element={<PhotoAlbums />} />
//           <Route path="/resources" element={<Resources />} />

//           {/* ----- AUTH PAGES ----- */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />

//           {/* ----- DASHBOARDS (login required) ----- */}
//           <Route
//             path="/dash/admin/*"
//             element={
//               <ProtectedRoute roles={["admin"]}>
//                 <AdminRoutes />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/dash/finance/*"
//             element={
//               <ProtectedRoute roles={["finance", "admin"]}>
//                 <FinanceRoutes />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/dash/membership/*"
//             element={
//               <ProtectedRoute
//                 roles={["member", "member_mgr", "finance", "admin"]}
//               >
//                 <MemberRoutes />
//               </ProtectedRoute>
//             }
//           />

//           <Route path="/more/media-gallery" element={<MediaGallery />} />
//           <Route path="/more/resources" element={<Resources />} />
//          <Route path="/forms" element={<Forms />} />
//           <Route path="/forms-page" element={<FormsPage />} />

//           {/* Fallback */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </main>

//       <Footer />
//     </div>
//   );
// }


// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

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
// import KidsSummerProgram from "./pages/forms/KidsSummerProgram";
// import ArkEncounter from "./pages/forms/ArkEncounter";
import ChurchMembershipForm from "./components/ChurchMembershipForm";
// import PhotoAlbums from "./pages/more/PhotoAlbums";
// import Resources from "./pages/more/Resources"; // "More" resources page
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import AdminRoutes from "./components/AdminDashboard/AdminRoutes";
import FinanceRoutes from "./components/FinanceDashboard/FinanceRoutes";
import MemberRoutes from "./components/MembershipDashoard/MemberRoutes";

import ProtectedRoute from "./components/ProtectedRoute";
import MediaGallery from "./pages/Media&Resources/MediaGallery";
import MediaResources from "./pages/Media&Resources/Resources"; // renamed to avoid conflict
import FormsPage from "./pages/sections/FormsPage";

export default function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <Routes>
          {/* ----- PUBLIC SITE (no login needed) ----- */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/about-us/details" element={<AboutPage />} />
          <Route path="/ministries" element={<Ministries />} />

          {/* News & Events public */}
          <Route path="/news-events" element={<NewsEvents />} />
          <Route path="/news-events/:category" element={<NewsEventsPage />} />

          {/* Serve public */}
          <Route path="/serve" element={<Serve />} />
          <Route path="/serve-details" element={<ServePage />} />

          {/* Forms & payments public */}
          <Route path="/forms" element={<Forms />} />
          {/* <Route
            path="/forms/kids-summer-program"
            element={<KidsSummerProgram />}
          />

          <Route path="/forms/ark-encounter" element={<ArkEncounter />} /> */}
          
          <Route
            path="/forms/church-membership-form"
            element={<ChurchMembershipForm />}
          />

          {/* Donation public (can donate without login) */}
          <Route path="/donate" element={<DonationPage />} />
          <Route
            path="/forms-payments/donation"
            element={<DonationPage />}
          />

          <Route path="/payments" element={<Payments />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* Extra info pages */}
          {/* <Route path="/photo-albums" element={<PhotoAlbums />} />
          <Route path="/resources" element={<Resources />} /> */}

          {/* ----- AUTH PAGES ----- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* ----- DASHBOARDS (login required) ----- */}
          <Route
            path="/dash/admin/*"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminRoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dash/finance/*"
            element={
              <ProtectedRoute roles={["finance", "admin"]}>
                <FinanceRoutes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dash/membership/*"
            element={
              <ProtectedRoute
                roles={["member", "member_mgr", "finance", "admin"]}
              >
                <MemberRoutes />
              </ProtectedRoute>
            }
          />

          {/* Media & Resources section under /more */}
          <Route path="/more/media-gallery" element={<MediaGallery />} />
          <Route path="/more/resources" element={<MediaResources />} />

          {/* Forms page wrapper */}
          <Route path="/forms-page" element={<FormsPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
