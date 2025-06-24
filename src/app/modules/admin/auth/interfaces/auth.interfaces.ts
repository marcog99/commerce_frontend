export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "customer"
  createdAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  names: string
  lastNames: string
  email: string
  password: string
  confirmPassword?: string
  rol: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}