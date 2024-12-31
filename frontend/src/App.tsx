import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import { AdminProvider } from "./contexts/AdminContext.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import AdminBookings from "./components/admin/AdminBookings.tsx";
import AdminCompanies from "./components/admin/AdminCompanies.tsx";
import AdminServices from "./components/admin/AdminServices.tsx";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AdminProvider>
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
                <Route path="/admin" element={<AdminLayout />}>
                  <Route
                    index
                    element={<Navigate to="/admin/bookings" replace />}
                  />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="companies" element={<AdminCompanies />} />
                  <Route path="services" element={<AdminServices />} />
                </Route>
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
};

export default App;
