import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateProductData, Product } from "./interfaces/product.interface"
import { Category } from "../categories/interfaces/categories.interface"
import http, { API_URL} from "@/app/core/service/http.service"

interface ProductFormProps {
  product?: Product
  onSubmit: (data: CreateProductData) => void
  onCancel: () => void
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState<CreateProductData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    sku: product?.sku || "",
    stock: product?.stock || 0,
    image: product?.image || "",
    categoryId: product?.categoryId || "",
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await http.get<Category[]>("/categories");
      setCategories(res)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof CreateProductData, value: string | number | File) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre del producto</Label>
        <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
      </div>

      <div>
        <Label htmlFor="description">Descripcion</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange("price", Number.parseFloat(e.target.value))}
            required
          />
        </div>

        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            id="stock"
            type="number"
            value={formData.stock}
            onChange={(e) => handleChange("stock", Number.parseInt(e.target.value))}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="sku">Codigo SKU</Label>
        <Input id="sku" value={formData.sku} onChange={(e) => handleChange("sku", e.target.value)} required />
      </div>
      
      <div className="mb-2">
        <Label htmlFor="category">Categoria</Label>
        <Select value={formData.categoryId} onValueChange={(value) => handleChange("categoryId", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una Categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="image">Imagen del producto</Label>
        {typeof formData.image === "string" && (
          <img 
          src={`${API_URL}${formData.image}`} 
          alt="No loaded" 
          width={50}
          height={50} />
        )}

        <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => {
        const file = e.target.files?.[0]
        if (file) handleChange("image", file)
        }}
        />
      </div>

      <div className="flex gap-2">
        <Button className="bg-blue-800 hover:bg-blue-700" type="submit">{product ? "Actualizar" : "Crear"} Producto</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
        </Button>
      </div>
    </form>
  )
}
