import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getServices } from "../services/api.ts";
import { Service } from "../types/services.ts";
import { useAuth } from "../contexts/AuthContext.tsx";

interface ServiceWithId extends Service {
  _id: string;
}

const ServicesSection = () => {
  const { currentUser } = useAuth();
  const [services, setServices] = useState<ServiceWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredPackage, setHoveredPackage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getServices();

        if (!data) {
          throw new Error("No data received from the server");
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load services. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handlePackageSelect = (serviceId: string) => {
    if (currentUser) {
      navigate(`/services/${serviceId}/book`);
    } else {
      navigate("/login", { state: { from: `/services/${serviceId}/book` } });
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
      </div>
    );
  }

  if (error) {
    return <div className="py-20 text-center text-red-600">{error}</div>;
  }

  return (
    <section
      id="services-section"
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect wash package for your vehicle
          </p>
        </div>

        {/* Service Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service._id}
              className={`relative bg-white rounded-lg shadow-lg transition-transform duration-300 ${
                hoveredPackage === service._id ? "transform -translate-y-2" : ""
              }`}
              onMouseEnter={() => setHoveredPackage(service._id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              {service.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-tr-lg rounded-bl-lg text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.name}
                </h3>
                <p className="text-4xl font-bold text-blue-600 mb-6">
                  ${service.price}
                </p>
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <svg
                        className={`w-5 h-5 mr-2 ${
                          service.popular ? "text-blue-500" : "text-green-500"
                        }`}
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
                <button
                  onClick={() => handlePackageSelect(service._id)}
                  className={`w-full py-3 px-6 rounded-md text-white font-medium transition-colors duration-300 ${
                    service.popular
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-600 hover:bg-blue-600"
                  }`}
                >
                  Select Package
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <p className="text-gray-600">
            All packages include free water repellent treatment
          </p>
          <div className="mt-4">
            <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300">
              View all features →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
