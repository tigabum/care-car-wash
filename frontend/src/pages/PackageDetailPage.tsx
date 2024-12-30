import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Service } from "../types/services.ts";
import { Company } from "../types/company.ts";
import { BookingFormData } from "../types/booking.ts";
import { getServiceById, createBooking } from "../services/api.ts";
import { toast } from "react-hot-toast";
import SuccessMessage from "../components/SuccessMessage.tsx";
import CompanySelectModal from "../components/CompanySelectModal.tsx";

const PackageDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
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

          // If it's a public servant service, show company modal
          if (data.isPublicServant && !selectedCompany) {
            setShowCompanyModal(true);
          }
        }
      } catch (error) {
        toast.error("Failed to load package details");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, selectedCompany]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setShowCompanyModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !service) return;

    const bookingData = {
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      carType: formData.carType,
      licensePlate: formData.licensePlate,
      location: formData.location,
      appointmentDate: formData.appointmentDate,
      userId: currentUser.uid,
      serviceId: service._id,
      companyId: selectedCompany?._id || undefined,
      totalPrice: service.price,
      isPublicServant: service.isPublicServant || false,
    };

    console.log("Submitting booking:", bookingData); // Debug log

    try {
      setSubmitting(true);
      await createBooking(bookingData);
      setShowSuccess(true);
    } catch (error) {
      console.error("Booking error:", error);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Package Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {service?.name}
          </h1>
          {service?.isPublicServant && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Public Servant Service
              </h3>
              {selectedCompany ? (
                <div>
                  <p className="text-blue-600">Selected Company:</p>
                  <p className="font-medium">{selectedCompany.name}</p>
                  <button
                    onClick={() => setShowCompanyModal(true)}
                    className="text-blue-600 text-sm mt-2 hover:text-blue-700"
                  >
                    Change Company
                  </button>
                </div>
              ) : (
                <p className="text-blue-600">
                  Please select your company to proceed
                </p>
              )}
            </div>
          )}
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
          {service?.isPublicServant && !selectedCompany ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Please select your company to proceed with booking
              </p>
              <button
                onClick={() => setShowCompanyModal(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Select Company
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>

      {/* Company Selection Modal */}
      <CompanySelectModal
        isOpen={showCompanyModal}
        onClose={() => {
          setShowCompanyModal(false);
          if (!selectedCompany && service?.isPublicServant) {
            navigate("/services");
          }
        }}
        onSelect={handleCompanySelect}
      />

      {/* Success Message */}
      {showSuccess && (
        <SuccessMessage
          message="Your booking has been successfully submitted!"
          redirectPath="/bookings"
          redirectTime={3000}
        />
      )}
    </div>
  );
};

export default PackageDetailPage;
