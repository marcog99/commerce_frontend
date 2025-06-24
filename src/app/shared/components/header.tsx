import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Search,
  User,
  Menu,
  Package,
  LogOut,
  Shield,
} from "lucide-react";
import { useAuthHook } from "@/app/core/hooks/use-auth";

export function Header() {
  const navigate = useNavigate();
  const [isAdmin] = useState(true);
  const { isAuthenticated, logout, user } = useAuthHook();

  const handleCloseSesion = () => {
    logout();
    navigate('/login'); 
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="logo de la empresa"
              className="w-50 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
            ></img>           
             <span className="text-xl font-bold font-mono">CEMACO</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Inicio
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Productos
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Categorias
            </Link>
          </nav>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Buscar Productos..."
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <div className="h-8 w-8 rounded-full bg-blue-800 hover:bg-blue-700 flex items-center justify-center">
                      <User className="h-4 w-4 text-white " />
                    </div>
                    <span className="hidden sm:block">{user?.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-xs text-gray-500">
                    {user?.email}
                  </div>
                  <DropdownMenuSeparator />

                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center">
                          <Shield className="w-4 h-4 mr-2" />
                          Panel de Administracion
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  <DropdownMenuItem asChild>
                    <Link to="/admin/products" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Productos
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link to="/admin/categories" className="flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      Categorias
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem 
                  onClick={() => handleCloseSesion()}
                  className="flex items-center text-red-600">
                    <LogOut 
                    className="w-4 h-4 mr-2" />
                    Cerrar Sesion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Iniciar Sesion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-blue-800 hover:bg-blue-700">Registrarse</Button>
                </Link>
              </div>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/admin" className="text-lg font-medium">
                    Inicio
                  </Link>
                  <Link to="/admin/products" className="text-lg font-medium">
                    Productos
                  </Link>
                  <Link to="/admin/categories" className="text-lg font-medium">
                    Categorias
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
