import { ROLES } from "@/app/modules/admin/products/interfaces/product.interface";
import { jwtDecode } from "jwt-decode";

export interface DecodeTokenInterface {
  id: string;
  email: string;
  name: string;
  rol: ROLES;
  createdAt: string;
}

export function DecodeToken(token: string): DecodeTokenInterface | null {
  try {
    return jwtDecode<DecodeTokenInterface>(token);
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}
