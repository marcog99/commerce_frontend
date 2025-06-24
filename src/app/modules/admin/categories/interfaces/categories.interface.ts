export interface Category {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface CreateCategoryData {
  name: string
  description: string
}
