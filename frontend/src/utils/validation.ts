import { BookingFormData } from "../types/booking";

export const validateCompanyRegistration = (
  registrationNumber: string
): boolean => {
  // Add your company registration number validation logic
  // This is a simple example - adjust according to your needs
  const pattern = /^[A-Z0-9]{6,}$/;
  return pattern.test(registrationNumber);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Add your phone number validation logic
  const pattern = /^\+?[1-9]\d{9,14}$/;
  return pattern.test(phoneNumber);
};

export const validateBookingData = (data: BookingFormData): string[] => {
  const errors: string[] = [];

  if (!data.fullName || data.fullName.length < 2) {
    errors.push("Full name is required and must be at least 2 characters");
  }

  if (!validatePhoneNumber(data.phoneNumber)) {
    errors.push("Please enter a valid phone number");
  }

  if (!data.carType || data.carType.length < 2) {
    errors.push("Car type is required");
  }

  if (!data.licensePlate || data.licensePlate.length < 2) {
    errors.push("License plate is required");
  }

  if (!data.location) {
    errors.push("Location is required");
  }

  if (!data.appointmentDate) {
    errors.push("Appointment date is required");
  } else {
    const appointmentDate = new Date(data.appointmentDate);
    const now = new Date();
    if (appointmentDate < now) {
      errors.push("Appointment date must be in the future");
    }
  }

  return errors;
};
