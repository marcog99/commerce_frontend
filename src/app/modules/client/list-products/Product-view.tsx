import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Product } from "../../admin/products/interfaces/product.interface";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http, { API_URL } from "@/app/core/service/http.service";

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await http.get<Product>(`/products/${id}`);
      setProduct(res);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Product not found
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square relative overflow-hidden rounded-lg">
          <img
            src={
              product.image ? `${API_URL}${product.image}` : "/placeholder.svg"
            }
            alt={product?.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product?.name}
            </h1>
            <p className="text-gray-600 text-lg">{product?.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-blue-900">
              Q. {product?.price?.toFixed(2)}
            </span>
            {product.stock === 0 ? (
              <Badge variant="destructive">No hay existencias</Badge>
            ) : (
              <Badge variant="secondary">En Stock ({product?.stock})</Badge>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">SKU:</span> {product?.sku}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Stock:</span> {product?.stock} unidades
            </p>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full bg-green-700 hover:bg-green-600"
              disabled={product?.stock === 0}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Agregar al Carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
