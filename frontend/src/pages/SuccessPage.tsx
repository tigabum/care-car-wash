import React from "react";
import { Link } from "react-router-dom";

const SuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Order Submitted Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We will contact you shortly.
        </p>
        <Link to="/" className="text-blue-600 hover:text-blue-500">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
