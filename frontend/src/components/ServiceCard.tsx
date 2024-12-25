import React from "react";
import { useNavigate } from "react-router-dom";
import { ServiceFeature } from "../types/order";

interface ServiceCardProps extends ServiceFeature {}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  subtitle,
  price,
  features,
  monthlyPrice,
}) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/order", {
      state: { serviceType: title, price },
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-xl font-bold mb-2 text-blue-600">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
      <h4 className="text-2xl font-bold mb-4 text-gray-800">{price}</h4>
      <ul className="text-gray-600 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="mb-1">
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={handleOrderClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 mb-4"
      >
        Order Now
      </button>
      <p className="text-sm text-gray-500">
        Unlimited Monthly for just <br />
        <span className="font-bold">{monthlyPrice}</span>
      </p>
      <button className="bg-gray-200 text-blue-600 px-4 py-2 rounded-full hover:bg-gray-300 mt-2">
        Subscribe Now
      </button>
    </div>
  );
};
