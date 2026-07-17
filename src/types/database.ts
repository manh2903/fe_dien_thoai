export type ProductCondition = "new" | "used";

export type ContactIcon =
  | "zalo"
  | "phone"
  | "facebook"
  | "messenger"
  | "tiktok"
  | "instagram"
  | "website"
  | "link";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  image_url: string;
  storage: string;
  ram: string;
  color: string;
  condition: ProductCondition;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactLink {
  id: string;
  title: string;
  url: string;
  icon: ContactIcon;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface ProductFormData {
  name: string;
  brand: string;
  price: number;
  description: string;
  image_url: string;
  storage: string;
  ram: string;
  color: string;
  condition: ProductCondition;
  is_active: boolean;
}

export interface LinkFormData {
  title: string;
  url: string;
  icon: ContactIcon;
  sort_order: number;
  is_active: boolean;
}
