export type ServiceType = "normal" | "luxury";

export interface ServiceFeature {
  title: string;
  subtitle?: string;
  price: string;
  features: string[];
  monthlyPrice: string;
}

export interface OrderFormData {
  fullName: string;
  carPlate: string;
  phoneNumber: string;
  location: string;
  serviceType: string;
  packageType?: ServiceType;
  price: string;
}
