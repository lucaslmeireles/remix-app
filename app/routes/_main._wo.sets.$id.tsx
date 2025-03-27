import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Informações do Conjunto" }];
};

export type ComponentToSet = {
  id: number;
  quantity: number;
  Components: {
    id: number;
    reference: string;
    description: string | null;
  };
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
  ComponentsToSets: ComponentToSet[];
};

export type LoaderData = {
  set: Sets;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) throw new Error("Conjunto não encontrado");

  const set = await db.sets.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      ComponentsToSets: {
        include: {
          Components: true,
        },
      },
    },
  });

  if (!set) throw new Error("Conjunto não encontrado");

  return { set };
};

export default function SetId() {
  const navigate = useNavigate();
  const { set } = useLoaderData<LoaderData>();
  const { id } = useParams();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">{set.model}</h1>
        <p className="text-slate-600 mt-1">{set.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Set Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
            Informações do Conjunto
          </h2>
          {/* TODO Talvez mudar para flex flexrow */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-slate-600">Ref1:</p>
              <p className="font-medium">{set.ref1}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="text-slate-600">Ref2:</p>
              <p className="font-medium">{set.ref2}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="text-slate-600">Ref3:</p>
              <p className="font-medium">{set.ref3}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="text-slate-600">UC:</p>
              <p className="font-medium">{set.uc}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="text-slate-600">Rack:</p>
              <p className="font-medium">{set.rack}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="text-slate-600">Consumo médio:</p>
              <p className="font-medium">{set.avg_monthly_consumed}</p>
            </div>
          </div>
        </div>

        {/* Components Card */}
        <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
            Componentes do Conjunto
          </h2>

          {set.ComponentsToSets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {set.ComponentsToSets.map((item) => (
                <div
                  key={item.id}
                  className="border border-slate-200 p-4 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <Link
                    to={`/components/${item.Components.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium block"
                  >
                    {item.Components.reference}
                  </Link>
                  <p className="text-slate-700 mt-1 text-sm line-clamp-2">
                    {item.Components.description}
                  </p>
                  <div className="mt-2 inline-block bg-slate-100 px-2 py-1 rounded text-sm">
                    Quantidade:{" "}
                    <span className="font-semibold">{item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-slate-500 mb-4">
                Nenhum componente adicionado a este conjunto.
              </p>
              <Link to={`/sets/${id}/add-components`}>
                <button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2 rounded-md font-medium flex items-center">
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
                  Adicionar Componentes
                </button>
              </Link>
            </div>
          )}

          {set.ComponentsToSets.length > 0 && (
            <div className="mt-4 flex justify-end">
              <Link to={`/sets/${id}/add-components`}>
                <button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-3 py-1.5 rounded text-sm font-medium flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Adicionar mais
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Outlet for nested routes */}
      <Outlet />

      {/* TODO Colocat um link */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate("/sets")}
          className="bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors px-4 py-2 rounded-md font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Voltar para Conjuntos
        </button>
      </div>
    </div>
  );
}
