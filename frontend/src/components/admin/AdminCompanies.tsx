import React, { useState, useEffect } from "react";
import api from "../../services/api.ts";
import { auth } from "../../config/firebase.ts";

interface Company {
  _id: string;
  name: string;
  registrationNumber: string;
  contactNumber: string;
  email: string;
  address: string;
  isVerified: boolean;
}

const AdminCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    contactNumber: "",
    email: "",
    address: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await api.get("/admin/companies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await auth.currentUser?.getIdToken();
      await api.post("/admin/companies", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCompanies();
      setFormData({
        name: "",
        registrationNumber: "",
        contactNumber: "",
        email: "",
        address: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const toggleVerification = async (companyId: string, isVerified: boolean) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      await api.patch(
        `/admin/companies/${companyId}/verify`,
        { isVerified },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCompanies();
    } catch (error) {
      console.error("Error updating company verification:", error);
    }
  };

  if (loading) {
    return <div>Loading companies...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Companies</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "Add New Company"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md mb-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Company Name
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
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Company
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Company</th>
              <th className="px-6 py-3 text-left">Registration</th>
              <th className="px-6 py-3 text-left">Contact</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium">{company.name}</div>
                  <div className="text-sm text-gray-600">{company.email}</div>
                </td>
                <td className="px-6 py-4">{company.registrationNumber}</td>
                <td className="px-6 py-4">{company.contactNumber}</td>
                <td className="px-6 py-4">{company.address}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      company.isVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {company.isVerified ? "Verified" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      toggleVerification(company._id, !company.isVerified)
                    }
                    className={`px-3 py-1 rounded ${
                      company.isVerified
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {company.isVerified ? "Revoke" : "Verify"}
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

export default AdminCompanies;
