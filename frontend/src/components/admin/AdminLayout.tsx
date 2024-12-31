import React from "react";
import { Navigate, Outlet, Link } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext.tsx";

const AdminLayout = () => {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex">
      {/* Admin Sidebar */}
      <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/bookings"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                Bookings
              </Link>
            </li>
            <li>
              <Link
                to="/admin/companies"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                Companies
              </Link>
            </li>
            <li>
              <Link
                to="/admin/services"
                className="block py-2 px-4 hover:bg-gray-700 rounded"
              >
                Services
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
