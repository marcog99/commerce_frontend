import { useAuthHook } from "@/app/core/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Tag, Eye} from "lucide-react"
import { Link } from "react-router-dom"


export default function AdminDashboard() {
  const { user } = useAuthHook();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Rol: {user?.rol} </h1>
        <p className="text-gray-600 mt-2">Bienvenido, Aqui podras gestionar la informacion de la tienda</p>
      </div>

      
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rapidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to='/admin/products' className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Package className="h-8 w-8 text-blue-600 mb-2" />
              <div className="font-medium">Agregar Producto</div>
              <div className="text-sm text-gray-600">Crear un nuevo producto</div>
            </Link>
            <Link to='/admin/categories' className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Tag className="h-8 w-8 text-green-600 mb-2" />
              <div className="font-medium">Agregar Categoria </div>
              <div className="text-sm text-gray-600">Crear una nueva categoria</div>
            </Link>
            <Link to='/' className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
              <Eye className="h-8 w-8 text-orange-600 mb-2" />
              <div className="font-medium">Visualizar Sitio Web</div>
              <div className="text-sm text-gray-600">Revisar sitio web</div>
            </Link>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
