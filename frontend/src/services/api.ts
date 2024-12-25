import axios from "axios";
import { OrderFormData } from "../types/order";
import { Booking } from "../types/booking";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getServices = async () => {
  const response = await api.get("/services");
  return response.data;
};

export const getLocations = async () => {
  const response = await api.get("/locations");
  return response.data;
};

export const getHeroSlides = async () => {
  const response = await api.get("/hero-slides");
  return response.data;
};

export const orderService = {
  createOrder: async (orderData: OrderFormData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },
};

// Booking related API calls
export const createBooking = async (bookingData: Partial<Booking>) => {
  const response = await api.post("/bookings", bookingData);
  return response.data;
};

export const getUserBookings = async (userId: string) => {
  const response = await api.get(`/bookings/user/${userId}`);
  return response.data;
};

export const getBookingById = async (id: string) => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

export const updateBookingStatus = async (id: string, status: string) => {
  const response = await api.patch(`/bookings/${id}/status`, { status });
  return response.data;
};

export const getServiceById = async (id: string) => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

export const getAllBookings = async () => {
  const response = await api.get("/bookings/all");
  return response.data;
};

export const getBookingStats = async () => {
  const response = await api.get("/bookings/stats");
  return response.data;
};

export const cancelBooking = async (id: string) => {
  console.log("API call to cancel booking:", id);
  const response = await api.delete(`/bookings/${id}`);
  console.log("API response:", response);
  return response.data;
};

export default api;
