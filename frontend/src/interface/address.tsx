export interface Address {
  ID: number;
  user_id: number;
  user_address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface ModleCreateAddress {
  user_address: string;
  city: string;
  postal_code: string;
  country: string;
}
