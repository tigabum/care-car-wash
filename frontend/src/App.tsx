import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
import ServicesPage from "./pages/ServicesPage.tsx";
import { OrderForm } from "./components/OrderForm.tsx";
import SuccessPage from "./pages/SuccessPage.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import BookingsPage from "./pages/BookingsPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PackageDetailPage from "./pages/PackageDetailPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow pt-[104px]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/services/:id" element={<ServicesPage />} />
              <Route path="/order" element={<OrderForm />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route
                path="/services/:id/book"
                element={
                  <ProtectedRoute>
                    <PackageDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <ProtectedRoute>
                    <BookingsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
