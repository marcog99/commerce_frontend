import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  Category,
  CreateCategoryData,
} from "./interfaces/categories.interface";
import CategoryForm from "./category-form";
import http from "@/app/core/service/http.service";
import { useAuthHook } from "@/app/core/hooks/use-auth";
import { ROLES } from "../products/interfaces/product.interface";

const CategoryAdmin = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthHook();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await http.get<Category[]>("/categories");
      setCategories(res);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (data: CreateCategoryData) => {
    try {
      const res = await http.post<Category>(
        "/categories",
        data,
        undefined,
        "Creado Exitosamente"
      );

      if (res) {
        await fetchCategories();
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  const handleUpdateCategory = async (data: CreateCategoryData) => {
    if (!editingCategory) return;

    try {
      const res = await http.put<Category>(
        `/categories/${editingCategory.id}`,
        data,
        undefined,
        "Actualizado Exitosamente"
      );

      if (res) {
        await fetchCategories();
        setIsDialogOpen(false);
        setEditingCategory(null);
      }
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      const res = await http.delete<Category>(
        `/categories/${id}`,
        undefined,
        "Eliminado Exitosamente"
      );

      if (res) {
        await fetchCategories();
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const openCreateDialog = () => {
    setEditingCategory(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (category: Category) => {
    setEditingCategory(category);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Categorias</h1>
        <Button
          className="bg-green-700 hover:bg-green-600"
          onClick={openCreateDialog}
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Categoria
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Categorias</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripcion</TableHead>
                <TableHead>Fecha de Creacion</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-gray-500 py-4"
                  >
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>
                      {new Date(category.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {user?.rol === ROLES.ADMIN && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteCategory(category.id)}
                          className="bg-red-700 hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4 text-gray-100" />
                        </Button>)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Editar Categoria" : "Crear Categoria"}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm
            category={editingCategory || undefined}
            onSubmit={
              editingCategory ? handleUpdateCategory : handleCreateCategory
            }
            onCancel={closeDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryAdmin;
