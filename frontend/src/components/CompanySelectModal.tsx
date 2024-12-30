import React, { useState, useEffect } from "react";
import { Company } from "../types/company.ts";
import { getCompanies, searchCompanies } from "../services/api.ts";
import { toast } from "react-hot-toast";

interface CompanySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (company: Company) => void;
}

const CompanySelectModal: React.FC<CompanySelectModalProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  // Fetch all companies on modal open
  useEffect(() => {
    if (isOpen) {
      const fetchAllCompanies = async () => {
        setLoading(true);
        try {
          const data = await getCompanies();
          setCompanies(data);
        } catch (error) {
          toast.error("Failed to fetch companies");
        } finally {
          setLoading(false);
        }
      };

      fetchAllCompanies();
    }
  }, [isOpen]);

  // Handle search
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const searchTimer = setTimeout(async () => {
        try {
          const results = await searchCompanies(searchQuery);
          setCompanies(results);
        } catch (error) {
          toast.error("Failed to search companies");
        }
      }, 300);

      return () => clearTimeout(searchTimer);
    }
  }, [searchQuery]);

  const handleCompanySelect = (companyId: string) => {
    const company = companies.find((c) => c._id === companyId);
    if (company) {
      setSelectedCompany(companyId);
      onSelect(company);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                  Select Your Company
                </h3>

                {/* Company Dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select from list
                  </label>
                  <select
                    value={selectedCompany}
                    onChange={(e) => handleCompanySelect(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Choose a company</option>
                    {companies.map((company) => (
                      <option key={company._id} value={company._id}>
                        {company.name} - {company.registrationNumber}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Option */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or search by name
                  </label>
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {loading && (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                  </div>
                )}

                {searchQuery.length >= 2 &&
                  companies.length === 0 &&
                  !loading && (
                    <p className="text-center text-gray-500 py-4">
                      No companies found. Please select from the dropdown above
                      or contact support.
                    </p>
                  )}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySelectModal;
