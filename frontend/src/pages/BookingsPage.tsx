import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { getUserBookings, cancelBooking } from "../services/api.ts";
import { Booking } from "../types/booking.ts";
import { format } from "date-fns";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModal.tsx";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const BookingsPage = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) return;

      try {
        const data = await getUserBookings(currentUser.uid);
        setBookings(data);
      } catch (err) {
        setError("Failed to load bookings");
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser]);

  const handleCancelClick = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId) {
      console.error("No booking ID provided");
      toast.error("Cannot cancel booking: Invalid booking ID");
      return;
    }

    try {
      console.log("Attempting to cancel booking:", selectedBookingId);
      const response = await cancelBooking(selectedBookingId);
      console.log("Cancel response:", response);

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== selectedBookingId)
      );

      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.error("Error details:", error);
      toast.error("Failed to cancel booking");
    } finally {
      setIsModalOpen(false);
      setSelectedBookingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No bookings found
          </h3>
          <p className="text-gray-500">
            You haven't made any car wash bookings yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {typeof booking.serviceId === "object"
                        ? booking.serviceId.name
                        : "Service"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Booked for:{" "}
                      {format(new Date(booking.appointmentDate), "PPP p")}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusColors[booking.status]
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Car Details
                    </h4>
                    <p className="text-gray-900">{booking.carType}</p>
                    <p className="text-gray-900">{booking.licensePlate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-1">
                      Location
                    </h4>
                    <p className="text-gray-900">{booking.location}</p>
                  </div>
                </div>

                {booking.status === "pending" && (
                  <div className="mt-4 flex justify-end p-6">
                    <button
                      onClick={() => handleCancelClick(booking._id)}
                      className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancelBooking}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
      />
    </div>
  );
};

export default BookingsPage;
