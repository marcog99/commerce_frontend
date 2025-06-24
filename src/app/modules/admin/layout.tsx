import type React from "react"
import { Link } from "react-router-dom"
import { Package, Tag, Home } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/admin" className="flex items-center space-x-2">
                            <img
              src="/logo.png"
              alt="logo de la empresa"
              className="w-50 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
            ></img>   
                <span className="text-xl font-bold text-gray-900">Administracion</span>
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/admin"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Inicio 
                </Link>
                <Link
                  to="/admin/products"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Productos
                </Link>
                <Link
                  to="/admin/categories"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Categorias
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-sm font-medium text-gray-100 bg-blue-800 hover:bg-blue-700 px-3 py-2 rounded-md"
              >
                Ver Tienda
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</main>
    </div>
  )
}
