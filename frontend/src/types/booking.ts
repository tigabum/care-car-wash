export interface Booking {
  id: string;
  userId: string;
  packageId:
    | {
        id: string;
        name: string;
        price: number;
        features: string[];
      }
    | string;
  fullName: string;
  phoneNumber: string;
  carType: string;
  licensePlate: string;
  location: string;
  appointmentDate: Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
}

export interface BookingFormData {
  fullName: string;
  phoneNumber: string;
  carType: string;
  licensePlate: string;
  location: string;
  appointmentDate: string;
  userId?: string;
  packageId?: string;
}
