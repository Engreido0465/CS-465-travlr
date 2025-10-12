export interface Trip {
  _id?: string;
  name: string;
  description: string;
  description2: string;
  length: number;
  start: string; // yyyy-mm-dd (ISO date string is fine)
  price: number;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}
