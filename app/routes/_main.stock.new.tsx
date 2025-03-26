"use client";

import { StockType } from "@prisma/client";
import {
  type MetaFunction,
  useLoaderData,
  useNavigate,
  Form,
} from "@remix-run/react";
import { db } from "utils/db.server";
import { Components } from "./_main.components.new";
import { ActionFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Adicionar Estoque" }];
};

export const loader = async () => {
  const components = await db.components.findMany();
  return { components };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const component_id = form.get("component_id") ?? "";
  const quantity = form.get("quantity") ?? "";
  const type = form.get("type") ?? "";
  const fields = {
    component_id: String(component_id),
    quantity: Number(quantity),
    type: type,
  };

  await db.stock.create({
    data: {
      Components: {
        connect: {
          id: +fields.component_id,
        },
      },
      quantity: fields.quantity,
      type: fields.type,
    },
  });

  return null;
};

export default function AddStock() {
  const { components } = useLoaderData<{ components: Components[] }>();
  const navigate = useNavigate();

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Adicionar Estoque</h1>
        <p className="text-slate-600 mt-1">
          Registre a entrada de novos itens no estoque
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="component_id"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Produto
            </label>
            <select
              id="component_id"
              name="component_id"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled selected>
                Selecione um produto
              </option>
              {components.map((component) => (
                <option key={component.id} value={component.id}>
                  {component.reference} - {component.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Quantidade
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Tipo de Estoque
            </label>
            <select
              id="type"
              name="type"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled selected>
                Selecione o tipo
              </option>
              {Object.entries(StockType).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2 rounded-md font-medium"
            >
              Adicionar Estoque
            </button>

            <button
              type="button"
              onClick={() => navigate("/stock")}
              className="flex-1 bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors px-4 py-2 rounded-md font-medium"
            >
              Cancelar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
