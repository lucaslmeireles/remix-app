import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Componentes" }];
};

export type Components = {
  id: number;
  reference: string;
  cofor: string;
  supplier: number;
  description: string | null;
  UA: string | null;
  local: string | null;
};

export type LoaderData = {
  components: Components[];
};

export async function loader() {
  const components = await db.components.findMany();
  if (!components) throw new Error("Components not found");
  return { components };
}

export default function Components() {
  const { components } = useLoaderData<LoaderData>();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Componentes</h1>
          <p className="text-slate-600 mt-1">
            Visualize e gerencie os componentes disponíveis
          </p>
        </div>

        <Link
          to="/components/new"
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
          Adicionar Componente
        </Link>
      </div>

      {/* Components List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
          Lista de Componentes
        </h2>

        {components.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {components.map((component) => (
              <Link
                key={component.id}
                to={`/components/${component.id}`}
                className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex justify-between items-start">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mb-2">
                    {component.reference}
                  </span>
                </div>

                <h3 className="font-medium text-slate-900 line-clamp-1">
                  {component.description || "Sem descrição"}
                </h3>

                {component.UA && (
                  <p className="text-slate-600 text-sm mt-1">
                    UA: {component.UA}
                  </p>
                )}

                {component.local && (
                  <p className="text-slate-600 text-sm">
                    Local: {component.local}
                  </p>
                )}

                <div className="mt-auto pt-3 flex justify-between items-center">
                  <p className="text-slate-500 text-sm">
                    Cofor: {component.cofor}
                  </p>
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
            <p className="text-slate-500 mb-4">Nenhum componente encontrado.</p>
            <Link
              to="/components/new"
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
              Adicionar Componente
            </Link>
          </div>
        )}
      </div>

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
}
