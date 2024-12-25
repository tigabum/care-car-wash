export interface Service {
  _id: string;
  name: string;
  price: number;
  features: string[];
  popular: boolean;
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
