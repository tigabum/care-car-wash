import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  fullName: string;
  carPlate: string;
  phoneNumber: string;
  location: string;
  serviceType: string;
  packageType?: "normal" | "luxury";
  price: string;
  status: "pending" | "completed" | "cancelled";
  createdAt: Date;
}

const orderSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Full name is required"],
  },
  carPlate: {
    type: String,
    required: [true, "Car plate is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  serviceType: {
    type: String,
    required: [true, "Service type is required"],
  },
  packageType: {
    type: String,
    enum: ["normal", "luxury"],
  },
  price: {
    type: String,
    required: [true, "Price is required"],
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);
