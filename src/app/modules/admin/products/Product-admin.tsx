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
import { CreateProductData, Product, ROLES } from "./interfaces/product.interface";
import ProductForm from "./Product.form";
import http, { API_URL } from "@/app/core/service/http.service";
import { useAuthHook } from "@/app/core/hooks/use-auth";
const ProductAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuthHook();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await http.get<Product[]>(`/products`);
      setProducts(res);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (data: CreateProductData) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("sku", data.sku);
      formData.append("stock", data.stock.toString());
      formData.append("categoryId", data.categoryId);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const res = await http.post<Product>(
        "/products",
        formData,
        undefined,
        "Creado Exitosamente"
      );


      if (res) {
        await fetchProducts();
        setIsDialogOpen(false);
      } 
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  const handleUpdateProduct = async (data: CreateProductData) => {
    if (!editingProduct) return;

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      formData.append("sku", data.sku);
      formData.append("stock", data.stock.toString());
      formData.append("categoryId", data.categoryId);

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const res = await http.put<Product>(
        `/products/${editingProduct.id}`,
        formData,
        undefined,
        "Actualizado Exitosamente"
      );

      if (res) {
        await fetchProducts();
        setIsDialogOpen(false);
      } 
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
     try {
      const res = await http.delete<Product>(
        `/products/${id}`,
        undefined,
        "Eliminado Exitosamente"
      );

      if (res) {
        await fetchProducts();
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
        <Button
          onClick={openCreateDialog}
          className="bg-green-700 hover:bg-green-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Producto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={
                        product.image
                          ? `${API_URL}${product.image}`
                          : "/placeholder.svg"
                      }
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product?.name}</TableCell>
                  <TableCell>{product?.sku}</TableCell>
                  <TableCell>Q. {product?.price.toFixed(2)}</TableCell>
                  <TableCell>{product?.stock}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {user?.rol === ROLES.ADMIN && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-700 hover:bg-red-600"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4 text-gray-100" />
                      </Button>)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-screen overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Editar Producto" : "Crear Producto"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            product={editingProduct || undefined}
            onSubmit={
              editingProduct ? handleUpdateProduct : handleCreateProduct
            }
            onCancel={closeDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductAdmin;
