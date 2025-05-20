export interface IUser {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  isBlock? : boolean | undefined;
  address?: string;
  role: "admin" | "tenant" | "landlord";
  iat?: number;
  exp?: number;
}
