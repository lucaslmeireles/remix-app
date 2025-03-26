import type { MetaFunction } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Conjuntos" }];
};

export type Sets = {
  id: number;
  ref1: string;
  ref2: string;
  ref3: string;
  avg_monthly_consumed: number;
  model: string;
  description: string;
  uc: string;
  rack: string;
  ComponentsToSets: Array<{
    Components: {
      reference: string;
      description: string | null;
    };
  }>;
};

export type LoaderData = {
  sets: Sets[];
};

export async function loader() {
  const sets = await db.sets.findMany({
    include: {
      ComponentsToSets: {
        include: {
          Components: true,
        },
      },
    },
  });
  return { sets };
}

export default function Sets() {
  const { sets } = useLoaderData<LoaderData>();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Conjuntos</h1>
          <p className="text-slate-600 mt-1">
            Visualize e gerencie os conjuntos disponíveis
          </p>
        </div>

        <Link
          to="/sets/new"
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
          Adicionar Conjunto
        </Link>
      </div>

      {/* Sets List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
          Lista de Conjuntos
        </h2>

        {sets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sets.map((set) => (
              <Link
                key={set.id}
                to={`/sets/${set.id}`}
                className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex justify-between items-start">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mb-2">
                    {set.model}
                  </span>
                  {set.ComponentsToSets.length > 0 && (
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      {set.ComponentsToSets.length} componente
                      {set.ComponentsToSets.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                <h3 className="font-medium text-slate-900 line-clamp-1">
                  {set.description || "Sem descrição"}
                </h3>

                <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
                  <p className="text-slate-600">
                    UC: <span className="font-medium">{set.uc || "—"}</span>
                  </p>
                  <p className="text-slate-600">
                    Rack: <span className="font-medium">{set.rack || "—"}</span>
                  </p>
                  <p className="text-slate-600">
                    Ref1: <span className="font-medium">{set.ref1 || "—"}</span>
                  </p>
                  <p className="text-slate-600">
                    Consumo:{" "}
                    <span className="font-medium">
                      {set.avg_monthly_consumed || "0"}
                    </span>
                  </p>
                </div>

                <div className="mt-auto pt-3 flex justify-between items-center">
                  {set.ComponentsToSets.length === 0 ? (
                    <span className="text-amber-600 text-sm font-medium">
                      Sem componentes
                    </span>
                  ) : (
                    <span className="text-slate-500 text-sm">Ver detalhes</span>
                  )}
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
            <p className="text-slate-500 mb-4">Nenhum conjunto encontrado.</p>
            <Link
              to="/sets/new"
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
              Adicionar Conjunto
            </Link>
          </div>
        )}
      </div>

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
}
