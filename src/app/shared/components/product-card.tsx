import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"
import { API_URL } from "@/app/core/service/http.service"
import { Product } from "@/app/modules/admin/products/interfaces/product.interface"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.stock < 10
  const isOutOfStock = product.stock === 0

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <Link to={`/products/${product.id}`}>
            <div className="aspect-square relative overflow-hidden">
              <img
                src={
                  product.image
                    ? `${API_URL}${product.image}`
                    : "/placeholder.svg"
                }
                alt={product.name}              
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {isOutOfStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-sm">
                    No hay stock
                  </Badge>
                </div>
              )}
              {isLowStock && !isOutOfStock && (
                <Badge variant="secondary" className="absolute top-2 left-2">
                  Solo quedan {product.stock} 
                </Badge>
              )}
            </div>
          </Link>
        </div>

        <div className="p-4 space-y-3">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg leading-tight transition-colors line-clamp-2 text-center">
              {product.name}
            </h3>
          </Link>

          <p className="text-gray-600 text-sm line-clamp-2 text-center">{product.description}</p>

          <div className="flex items-center justify-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-900">Q. {product.price.toFixed(2)}</div>
              <div className="text-xs text-gray-500">SKU: {product.sku}</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
          <Button size="sm" disabled={isOutOfStock} className="w-100 bg-green-700 hover:bg-green-600">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Agregar al carrito
          </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
