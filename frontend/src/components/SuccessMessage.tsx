import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SuccessMessageProps {
  message: string;
  redirectPath?: string;
  redirectTime?: number;
}

const SuccessMessage = ({
  message,
  redirectPath = "/",
  redirectTime = 3000,
}: SuccessMessageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectPath);
    }, redirectTime);

    return () => clearTimeout(timer);
  }, [navigate, redirectPath, redirectTime]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
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
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Success!</h3>
          <p className="mt-2 text-sm text-gray-500">{message}</p>
          <p className="mt-4 text-xs text-gray-400">
            Redirecting in {redirectTime / 1000} seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
