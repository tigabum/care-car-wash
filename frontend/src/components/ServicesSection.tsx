import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getServices } from "../services/api.ts";
import { Service } from "../types/services.ts";
import { useAuth } from "../contexts/AuthContext.tsx";
import { toast } from "react-hot-toast";

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

  const handlePackageSelect = (service: ServiceWithId) => {
    if (!currentUser && service.isPublicServant) {
      toast.error("Please login to book public servant services");
      navigate("/login", {
        state: { from: `/services/${service._id}/book` },
      });
      return;
    }

    navigate(`/services/${service._id}/book`);
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

  // Separate services into regular and public servant
  const regularServices = services.filter(
    (service) => !service.isPublicServant
  );
  const publicServantServices = services.filter(
    (service) => service.isPublicServant
  );

  return (
    <section
      id="services-section"
      className="py-20 bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Regular Services Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect wash package for your vehicle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regularServices.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              isHovered={hoveredPackage === service._id}
              onHover={setHoveredPackage}
              onSelect={() => handlePackageSelect(service)}
            />
          ))}
        </div>

        {/* Public Servant Services Section */}
        {publicServantServices.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">
                Public Servant Services
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Special packages for our public servants
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {publicServantServices.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  isHovered={hoveredPackage === service._id}
                  onHover={setHoveredPackage}
                  onSelect={() => handlePackageSelect(service)}
                  isPublicServant
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Separate ServiceCard component for better organization
interface ServiceCardProps {
  service: ServiceWithId;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: () => void;
  isPublicServant?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isHovered,
  onHover,
  onSelect,
  isPublicServant,
}) => {
  return (
    <div
      className={`relative bg-white rounded-lg shadow-lg transition-transform duration-300 ${
        isHovered ? "transform -translate-y-2" : ""
      } ${isPublicServant ? "border-2 border-blue-500" : ""}`}
      onMouseEnter={() => onHover(service._id)}
      onMouseLeave={() => onHover(null)}
    >
      {service.popular && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-tr-lg rounded-bl-lg text-sm font-medium">
          Most Popular
        </div>
      )}
      {isPublicServant && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white px-3 py-1 rounded-tl-lg rounded-br-lg text-sm font-medium">
          Public Servant
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
                  service.popular || isPublicServant
                    ? "text-blue-500"
                    : "text-green-500"
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
          onClick={onSelect}
          className={`w-full py-3 px-6 rounded-md text-white font-medium transition-colors duration-300 ${
            isPublicServant
              ? "bg-blue-600 hover:bg-blue-700"
              : service.popular
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-600 hover:bg-blue-600"
          }`}
        >
          Select Package
        </button>
      </div>
    </div>
  );
};

export default ServicesSection;
