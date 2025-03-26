import type { Suppliers } from "@prisma/client";
import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Globe, MapPin, Phone, Mail } from "lucide-react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Fornecedores" }];
};

export type LoaderData = {
  suppliers: Suppliers[];
};

export async function loader() {
  const suppliers = await db.suppliers.findMany();
  if (!suppliers) throw new Error("Suppliers not found");
  return { suppliers };
}

export default function SuppliersList() {
  const { suppliers } = useLoaderData<LoaderData>();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fornecedores</h1>
          <p className="text-slate-600 mt-1">
            Visualize e gerencie os fornecedores disponíveis
          </p>
        </div>

        <Link
          to="/suppliers/new"
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2 rounded-md font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Adicionar Fornecedor
        </Link>
      </div>

      {/* Suppliers List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
          Lista de Fornecedores
        </h2>

        {suppliers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {suppliers.map((supplier) => (
              <Link
                key={supplier.id}
                to={`/suppliers/${supplier.id}`}
                className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    {supplier.type.toUpperCase()}
                  </span>

                  <div className="flex items-center">
                    {supplier.type === "ckd" ? (
                      <div className="bg-slate-100 p-1 rounded-full">
                        <Globe className="h-4 w-4 text-slate-700" />
                      </div>
                    ) : (
                      <div className="h-6 w-6 rounded-full overflow-hidden border border-slate-200">
                        <img
                          alt="Brasil"
                          src="http://purecatamphetamine.github.io/country-flag-icons/3x2/BR.svg"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="font-medium text-slate-900 text-lg mb-2">
                  {supplier.name}
                </h3>

                <div className="space-y-2 mt-2 text-sm">
                  {supplier.address && (
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 line-clamp-1">
                        {supplier.address}
                      </span>
                    </div>
                  )}

                  {supplier.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-slate-500 mr-2 flex-shrink-0" />
                      <span className="text-slate-600">{supplier.phone}</span>
                    </div>
                  )}

                  {supplier.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-slate-500 mr-2 flex-shrink-0" />
                      <span className="text-slate-600 line-clamp-1">
                        {supplier.email}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-3 flex justify-between items-center">
                  <span className="text-slate-500 text-sm">Ver detalhes</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-slate-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-slate-500 mb-4">Nenhum fornecedor encontrado.</p>
            <Link
              to="/suppliers/new"
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2 rounded-md font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Adicionar Fornecedor
            </Link>
          </div>
        )}
      </div>

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
}
