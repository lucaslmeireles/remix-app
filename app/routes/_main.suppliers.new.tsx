"use client";

import { SupplierType } from "@prisma/client";
import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { useNavigate, Form } from "@remix-run/react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Adicionar Fornecedor" }];
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name") ?? "";
  const address = form.get("address") ?? "";
  const phone = form.get("phone") ?? "";
  const email = form.get("email") ?? "";
  const type = form.get("type") ?? "";
  const fields = {
    name: String(name),
    address: String(address),
    phone: String(phone),
    email: String(email),
    type: type,
  };

  await db.suppliers.create({
    data: {
      name: fields.name,
      address: fields.address,
      phone: fields.phone,
      type: fields.type,
    },
  });

  return {
    redirect: "/suppliers",
  };
};

export default function AddSupplier() {
  const navigate = useNavigate();

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Adicionar Fornecedor
        </h1>
        <p className="text-slate-600 mt-1">
          Preencha os dados para cadastrar um novo fornecedor
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
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Tipo *
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled selected>
                    Selecione um tipo
                  </option>
                  {Object.entries(SupplierType).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Endereço
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cadastrar Fornecedor
            </button>

            <button
              type="button"
              onClick={() => navigate("/suppliers")}
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
