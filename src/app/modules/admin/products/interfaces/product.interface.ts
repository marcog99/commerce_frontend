export interface Product {
  id: string
  name: string
  description: string
  price: number
  sku: string
  stock: number
  image: string
  categoryId: string
  createdAt: string
  updatedAt: string
}


export interface CreateProductData {
  name: string
  description: string
  price: number
  sku: string
  stock: number
  image: string | File
  categoryId: string
}

export enum ROLES{
  ADMIN = 'ADMIN',
  COLABORADOR = 'COLABORADOR'
}