import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../admin/products/interfaces/product.interface";
import http from "@/app/core/service/http.service";
import { ProductCard } from "../../shared/components/product-card";

export default function ClientDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const stockLimit = 5;
        const res = await http.get<Product[]>("/products", {
          params: {stockLimit},
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
      <section className="bg-gradient-to-r from-blue-900 from-40% to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Bienvenido</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Encuentra lo que buscas al mejor precio
          </p>
          <Link to="/products">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100"
            >
              Comprar Ahora
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nuestros Productos
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dale un vistazo a nuestros productos mas vendidos
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

          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg">
                Ver mas Productos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
