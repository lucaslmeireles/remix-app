"use client";

import type { Stock, Suppliers } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Componentes" }];
};

export type Components = {
  id: number;
  reference: string;
  cofor: string;
  description: string | null;
  UA: string | null;
  local: string | null;
  Suppliers: Suppliers;
  Stock: Stock[];
};

export type LoaderData = {
  component: Components;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) throw new Error("Post not found");

  const component = await db.components.findUnique({
    where: { id: +params.id },
    include: { Stock: true, Suppliers: true },
  });

  if (!component) throw new Error("Component not found");

  const data = { component };

  return data;
};

export default function Component() {
  const { component } = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          {component.description}
        </h1>
        <p className="text-blue-600 font-medium mt-1">
          Ref: {component.reference}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Component Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
            Informações do Componente
          </h2>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <p className="text-slate-600">Cofor:</p>
              <p className="font-medium">{component.cofor}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="text-slate-600">UA:</p>
              <p className="font-medium">{component.UA || "—"}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="text-slate-600">Local:</p>
              <p className="font-medium">{component.local || "—"}</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="text-slate-600">Fornecedor:</p>
              <p className="font-medium">{component.Suppliers.name}</p>
            </div>
          </div>
        </div>

        {/* Stock Information Card */}
        <div className="bg-white rounded-lg shadow-md p-6 col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
            Informações de Estoque
          </h2>

          {component.Stock && component.Stock.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {component.Stock.map((stock) => (
                <div
                  key={stock.id}
                  className="border border-slate-200 p-4 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="inline-block bg-blue-100 text-first px-2 py-1 rounded text-sm font-medium">
                      {stock.type}
                    </div>
                    <div className="text-sm text-slate-500">
                      {new Date(stock.updatedAt).toLocaleDateString("pt-BR")}
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-slate-700">
                      Quantidade:{" "}
                      <span className="font-semibold text-lg">
                        {stock.quantity}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-slate-500">
                Nenhuma informação de estoque disponível.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate("/components")}
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
          Voltar para Componentes
        </button>
      </div>
    </div>
  );
}
