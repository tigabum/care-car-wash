import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const BookingPage = () => {
  const { currentUser } = useAuth();
  const { serviceId } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser?.uid) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData({
              fullName: currentUser.displayName || "",
              email: currentUser.email || "",
              phone: data.phone || "",
              address: data.address || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-gray-50 pt-[100px] pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Booking Details
          </h2>

          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <form className="space-y-6">
              {/* Personal Information Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userData.fullName}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userData.email}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={userData.phone}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={userData.address}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Booking Details Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Booking Details
                </h3>
                {/* Add your booking-specific fields here */}
                {/* These fields will be editable */}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#4C94FF] text-white rounded-lg hover:bg-[#4C94FF]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4C94FF]"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
