import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import http from "@/app/core/service/http.service";
import { Product } from "../../admin/products/interfaces/product.interface";
import { ProductCard } from "@/app/shared/components/product-card";

export default function ListProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const stockLimit = 5;
        const res = await http.get<Product[]>("/products", {
          params: { stockLimit },
        });
        setProducts(res);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestros Productos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Contamos con la mayor variedad en el mercado
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
