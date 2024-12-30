export interface Booking {
  _id: string;
  userId: string;
  serviceId:
    | {
        _id: string;
        name: string;
        price: number;
        features: string[];
        isPublicServant?: boolean;
      }
    | string;
  fullName: string;
  phoneNumber: string;
  carType: string;
  licensePlate: string;
  location: string;
  appointmentDate: string | Date;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
  companyId?:
    | {
        _id: string;
        name: string;
        registrationNumber: string;
      }
    | string;
  isPublicServant: boolean;
  totalPrice: number;
}

export interface BookingFormData {
  fullName: string;
  phoneNumber: string;
  carType: string;
  licensePlate: string;
  location: string;
  appointmentDate: string;
  userId?: string;
  serviceId?: string;
  companyId?: string;
  isPublicServant?: boolean;
  totalPrice?: number;
  status?: string;
}
