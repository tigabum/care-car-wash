import { ServiceFeature } from "../types/order";

export const newCustomerServices: Record<"normal" | "luxury", ServiceFeature> =
  {
    normal: {
      title: "New Customer",
      subtitle: "Standard Package",
      price: "$22",
      features: [
        "Basic Sealant",
        "High-gloss shine",
        "Water shield",
        "Basic paint protection",
      ],
      monthlyPrice: "$39.99/month",
    },
    luxury: {
      title: "New Customer",
      subtitle: "Luxury Package",
      price: "$32",
      features: [
        "Premium Graphene Sealant",
        "Ultra-gloss ceramic coating",
        "Advanced water & dust shield",
        "Enhanced paint protection",
        "Premium Microfiber Towel",
        "Interior detailing",
      ],
      monthlyPrice: "$59.99/month",
    },
  };

export const regularServices: ServiceFeature[] = [
  {
    title: "Regular Customer",
    price: "$18",
    features: ["Tire Shine", "Brightening Gloss", "WOW Air Freshener"],
    monthlyPrice: "$29.99/month",
  },
  {
    title: "Public Services",
    price: "$16",
    features: ["Triple Foam Polish", "UV Protectant", "Wheel Cleaning"],
    monthlyPrice: "$27.99/month",
  },
  {
    title: "CLEAN WASH",
    price: "$8",
    features: ["Pre-Soak", "Wash", "Dry", "Water Reclamation"],
    monthlyPrice: "$19.99/month",
  },
];
