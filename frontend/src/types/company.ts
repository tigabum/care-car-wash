export interface Company {
  _id: string;
  name: string;
  registrationNumber: string;
  contactNumber: string;
  email: string;
  address: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CompanySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (company: Company) => void;
  serviceId: string;
}
