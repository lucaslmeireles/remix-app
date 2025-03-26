import {
  Package,
  ShoppingCart,
  Layers,
  BarChart3,
  Boxes,
  Truck,
} from "lucide-react";

import { Button } from "./ui/button";
import { Link } from "@remix-run/react";

export function Header() {
  const routes = [
    {
      href: "/orders",
      label: "Pedidos",
      icon: <ShoppingCart className="h-4 w-4 mr-2" />,
    },
    {
      href: "/components",
      label: "Componentes",
      icon: <Package className="h-4 w-4 mr-2" />,
    },
    {
      href: "/sets",
      label: "Conjuntos",
      icon: <Layers className="h-4 w-4 mr-2" />,
    },
    {
      href: "/stock",
      label: "Estoque",
      icon: <Boxes className="h-4 w-4 mr-2" />,
    },
    {
      href: "/suppliers",
      label: "Fornecedores",
      icon: <Truck className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#1d2d44] text-white justify-center flex">
      <div className="flex h-16 items-center justify-around mx-3 w-full">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold text-[#f0ebd8]">
            PWT e Componentes
          </Link>
        </div>
        {/* TODO Repensar em como ser responsivo depois dos 900px */}
        <nav className="hidden lg:grid lg:items-center lg:gap-2 lg:md:grid-cols-5">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-[#3e5c76] relative group text-[#f0ebd8]"
            >
              <span className="absolute inset-0 w-1 bg-[#748cab] scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom left-0 rounded-r-sm" />
              {route.icon}
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            className="bg-[#f0ebd8] text-[#3e5c76] hover:text-[#1d2d44] hover:bg-[#e2dbc3] hover:font-semibold hover:shadow-md"
            size="sm"
          >
            Admin
          </Button>
        </div>
      </div>
    </header>
  );
}
