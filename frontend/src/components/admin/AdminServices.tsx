import React, { useState, useEffect } from "react";
import api from "../../services/api.ts";
import { auth } from "../../config/firebase.ts";

interface Service {
  _id: string;
  name: string;
  price: number;
  features: string[];
  popular: boolean;
  isPublicServant: boolean;
  requiredCompanyVerification: boolean;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    features: [""],
    popular: false,
    isPublicServant: false,
    requiredCompanyVerification: false,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await api.get("/admin/services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await auth.currentUser?.getIdToken();
      const serviceData = {
        ...formData,
        price: Number(formData.price),
        features: formData.features.filter((f) => f.trim() !== ""),
      };
      await api.post("/admin/services", serviceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchServices();
      setFormData({
        name: "",
        price: "",
        features: [""],
        popular: false,
        isPublicServant: false,
        requiredCompanyVerification: false,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const togglePopular = async (serviceId: string, popular: boolean) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      await api.patch(
        `/admin/services/${serviceId}/popular`,
        { popular },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchServices();
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  if (loading) {
    return <div>Loading services...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "Add New Service"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md mb-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Service Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Features</label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="Enter feature"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeature}
                className="mt-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Add Feature
              </button>
            </div>
            <div className="col-span-2 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="popular"
                  checked={formData.popular}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <span>Popular Service</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isPublicServant"
                  checked={formData.isPublicServant}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <span>Public Servant Service</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="requiredCompanyVerification"
                  checked={formData.requiredCompanyVerification}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <span>Requires Company Verification</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Service
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Service</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Features</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium">{service.name}</div>
                  {service.popular && (
                    <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Popular
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">${service.price}</td>
                <td className="px-6 py-4">
                  <ul className="list-disc list-inside">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4">
                  {service.isPublicServant && (
                    <div className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded mb-1">
                      Public Servant
                    </div>
                  )}
                  {service.requiredCompanyVerification && (
                    <div className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      Company Verification Required
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => togglePopular(service._id, !service.popular)}
                    className={`px-3 py-1 rounded ${
                      service.popular
                        ? "bg-gray-500 text-white hover:bg-gray-600"
                        : "bg-yellow-500 text-white hover:bg-yellow-600"
                    }`}
                  >
                    {service.popular ? "Remove Popular" : "Make Popular"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminServices;
