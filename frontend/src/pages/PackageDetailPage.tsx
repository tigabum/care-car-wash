import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Service } from "../types/services";
import { BookingFormData } from "../types/booking.ts";
import { getServiceById } from "../services/api.ts";
import { createBooking } from "../services/api.ts";
import { toast } from "react-toastify";
import SuccessMessage from "../components/SuccessMessage.tsx";

const PackageDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: "",
    phoneNumber: "",
    carType: "",
    licensePlate: "",
    location: "",
    appointmentDate: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (id) {
          const data = await getServiceById(id);
          setService(data);
        }
      } catch (error) {
        toast.error("Failed to load package details");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !service) return;

    try {
      setSubmitting(true);
      await createBooking({
        ...formData,
        userId: currentUser.uid,
        packageId: service._id,
        appointmentDate: new Date(formData.appointmentDate),
      });
      setShowSuccess(true);
    } catch (error) {
      toast.error("Failed to submit booking");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Package not found</h2>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <SuccessMessage
        message="Your booking has been successfully submitted!"
        redirectPath="/bookings"
        redirectTime={3000}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Package Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {service.name}
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <p className="text-2xl font-bold text-blue-600 mb-4">
              ${service.price}
            </p>
            <h3 className="text-lg font-semibold mb-3">Features:</h3>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Book Your Wash
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Car Type
              </label>
              <input
                type="text"
                name="carType"
                required
                value={formData.carType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                License Plate
              </label>
              <input
                type="text"
                name="licensePlate"
                required
                value={formData.licensePlate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a location</option>
                <option value="S. Buffalo Dr.">S. Buffalo Dr.</option>
                <option value="N. Durango">N. Durango</option>
                <option value="S. Fort Apache Rd.">S. Fort Apache Rd.</option>
                {/* Add more locations */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Date
              </label>
              <input
                type="datetime-local"
                name="appointmentDate"
                required
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Book Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;
