export interface Product {
  $id?: string;
  name: string;
  price: number;
  description: string;
  createdAt?: string;
}

export interface AuthSignFormData {
  name: string;
  email: string;
  password: string;
}

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}
