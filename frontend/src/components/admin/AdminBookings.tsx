import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { auth } from "../../config/firebase.ts";
import api from "../../services/api.ts";

interface Booking {
  _id: string;
  userId: string;
  serviceId: {
    name: string;
    price: number;
  };
  companyId?: {
    name: string;
  };
  fullName: string;
  phoneNumber: string;
  carType: string;
  licensePlate: string;
  location: string;
  appointmentDate: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  isPublicServant: boolean;
  totalPrice: number;
  createdAt: string;
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all, pending, confirmed, completed, cancelled

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();

      const response = await api.get("/admin/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(response.data);
      setError("");
    } catch (err) {
      console.error("Error details:", err);
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (
    bookingId: string,
    newStatus: Booking["status"]
  ) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      await api.patch(
        `/admin/bookings/${bookingId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBookings();
      setError("");
    } catch (err) {
      setError("Failed to update booking status");
    }
  };

  const filteredBookings = bookings.filter((booking) =>
    filter === "all" ? true : booking.status === filter
  );

  if (loading)
    return <div className="text-center p-4">Loading bookings...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Booking Management</h1>

        {/* Filter buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded ${
              filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("confirmed")}
            className={`px-4 py-2 rounded ${
              filter === "confirmed" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("cancelled")}
            className={`px-4 py-2 rounded ${
              filter === "cancelled" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Cancelled
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Service</th>
              <th className="px-6 py-3 text-left">Vehicle</th>
              <th className="px-6 py-3 text-left">Appointment</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium">{booking.fullName}</div>
                  <div className="text-sm text-gray-600">
                    {booking.phoneNumber}
                  </div>
                  {booking.isPublicServant && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      Public Servant
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div>{booking.serviceId.name}</div>
                  <div className="text-sm text-gray-600">
                    ${booking.totalPrice}
                  </div>
                  {booking.companyId && (
                    <div className="text-sm text-gray-600">
                      Company: {booking.companyId.name}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div>{booking.carType}</div>
                  <div className="text-sm text-gray-600">
                    {booking.licensePlate}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>{format(new Date(booking.appointmentDate), "PPP")}</div>
                  <div className="text-sm text-gray-600">
                    {booking.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateBookingStatus(booking._id, "confirmed")
                          }
                          className="w-full px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() =>
                            updateBookingStatus(booking._id, "cancelled")
                          }
                          className="w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(booking._id, "completed")
                        }
                        className="w-full px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
