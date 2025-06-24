
import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Category, CreateCategoryData } from "./interfaces/categories.interface"

interface CategoryFormProps {
  category?: Category
  onSubmit: (data: CreateCategoryData) => void
  onCancel: () => void
}

export default function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState<CreateCategoryData>({
    name: category?.name || "",
    description: category?.description || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: keyof CreateCategoryData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre</Label>
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

      <div className="flex gap-2">
        <Button type="submit" className="bg-blue-800 hover:bg-blue-700">{category ? "Actualizar" : "Guardar"}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
