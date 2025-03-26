"use client";

import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigate, Form } from "@remix-run/react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Adicionar Componente" }];
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

export type Suppliers = {
  id: number;
  name: string;
};

export type LoaderData = {
  suppliers: Suppliers[];
};

export const handle = {
  skipParentLayout: true,
};

export async function loader() {
  const suppliers = await db.suppliers.findMany();
  return { suppliers };
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const reference = form.get("referencia") ?? "";
  const cofor = form.get("cofor") ?? "";
  const supplier = form.get("fornecedor") ?? "";
  const description = form.get("descricao") ?? "";
  const ua = form.get("UA") ?? "";
  const local = form.get("local") ?? "";
  const fields = {
    referencia: String(reference),
    cofor: String(cofor),
    fornecedor: Number(supplier),
    descricao: String(description),
    UA: String(ua),
    local: String(local),
  };

  await db.components.create({
    data: {
      reference: fields.referencia,
      cofor: fields.cofor,
      description: fields.descricao,
      UA: fields.UA,
      local: fields.local,
      Suppliers: {
        connect: {
          id: fields.fornecedor,
        },
      },
    },
  });

  return {
    redirect: "/components",
  };
};

export default function AddComponent() {
  const { suppliers } = useLoaderData<LoaderData>();
  const navigate = useNavigate();

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Adicionar Componente
        </h1>
        <p className="text-slate-600 mt-1">
          Preencha os dados para cadastrar um novo componente
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <Form method="post" className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left Column */}
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="referencia"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Referência *
                </label>
                <input
                  type="text"
                  id="referencia"
                  name="referencia"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="cofor"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Cofor *
                </label>
                <input
                  type="text"
                  id="cofor"
                  name="cofor"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="fornecedor"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Fornecedor *
                </label>
                <select
                  id="fornecedor"
                  name="fornecedor"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>
                    Selecione um fornecedor
                  </option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.id}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="descricao"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Descrição
                </label>
                <input
                  type="text"
                  id="descricao"
                  name="descricao"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="ua"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  UA
                </label>
                <input
                  type="text"
                  id="ua"
                  name="UA"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="local"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Local
                </label>
                <input
                  type="text"
                  id="local"
                  name="local"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cadastrar Componente
            </button>

            <button
              type="button"
              onClick={() => navigate("/components")}
              className="flex-1 bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
          </div>
        </Form>
      </div>

      {/* Help Text */}
      <div className="mt-4 text-sm text-slate-500">
        <p>* Campos obrigatórios</p>
      </div>
    </div>
  );
}
