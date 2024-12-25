import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    licensePlate: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Booking", bookingSchema);
