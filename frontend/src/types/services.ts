import { Booking } from "./booking";

export interface Service {
  _id: string;
  name: string;
  price: number;
  features: string[];
  popular: boolean;
  isPublicServant: boolean;
  requiredCompanyVerification: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceFeature {
  title: string;
  subtitle?: string;
  price: string;
  features: string[];
  monthlyPrice: string;
}

// Update booking type to include company information
export interface BookingWithCompany extends Booking {
  companyId?: string;
  company?: {
    name: string;
    registrationNumber: string;
  };
}

export interface Location {
  id: number;
  name: string;
  address: string;
}

export interface HeroSlide {
  id: number;
  title: string;
  price: number;
  features: string[];
  image: string;
}
