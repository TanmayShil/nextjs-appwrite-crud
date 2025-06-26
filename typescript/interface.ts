export interface Product {
  $id?: string;
  name: string;
  price: number;
  description: string;
  createdAt?: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  image: FileList;
}

export interface AuthUser {
  name?: string;
  email: string;
}

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}
