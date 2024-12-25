import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { OrderFormData } from "../types/order";
import { orderService } from "../services/api.ts";

export const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceType, packageType, price } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>();

  const onSubmit = async (data: OrderFormData) => {
    try {
      await orderService.createOrder({
        ...data,
        serviceType,
        packageType,
        price,
      });

      toast.success("Order submitted successfully!");
      navigate("/success");
    } catch (error) {
      toast.error("Failed to submit order. Please try again.");
      console.error("Error submitting order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Order Details
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            {...register("fullName", { required: "Full name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Car Plate</label>
          <input
            {...register("carPlate", { required: "Car plate is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.carPlate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.carPlate.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 disabled:bg-blue-300"
        >
          {isSubmitting ? "Submitting..." : "Submit Order"}
        </button>
      </div>
    </form>
  );
};
