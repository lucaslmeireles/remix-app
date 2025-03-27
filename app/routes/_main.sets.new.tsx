import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { Form, redirect, Link } from "@remix-run/react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Adicionar Conjunto" }];
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
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const ref1 = form.get("ref1") ?? "";
  const ref2 = form.get("ref2") ?? "";
  const ref3 = form.get("ref3") ?? "";
  const model = form.get("model") ?? "";
  const description = form.get("description") ?? "";
  const uc = form.get("uc") ?? "";
  const rack = form.get("rack") ?? "";

  const fields = {
    ref1: String(ref1),
    ref2: String(ref2),
    ref3: String(ref3),
    model: String(model),
    description: String(description),
    uc: String(uc),
    rack: String(rack),
  };

  const newSet = await db.sets.create({
    data: {
      ref1: fields.ref1,
      ref2: fields.ref2,
      ref3: fields.ref3,
      model: fields.model,
      description: fields.description,
      uc: fields.uc,
      rack: fields.rack,
    },
  });

  return redirect(`/sets/${newSet.id}`);
};

export default function AddSet() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Adicionar Conjunto
        </h1>
        <p className="text-slate-600 mt-1">
          Preencha os dados para cadastrar um novo conjunto
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
                  htmlFor="model"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Modelo *
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Descrição *
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="ref1"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Referência 1
                </label>
                <input
                  type="text"
                  id="ref1"
                  name="ref1"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="ref2"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Referência 2
                </label>
                <input
                  type="text"
                  id="ref2"
                  name="ref2"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="ref3"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Referência 3
                </label>
                <input
                  type="text"
                  id="ref3"
                  name="ref3"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="uc"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  UC
                </label>
                <input
                  type="text"
                  id="uc"
                  name="uc"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="rack"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Rack
                </label>
                <input
                  type="text"
                  id="rack"
                  name="rack"
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
              Cadastrar Conjunto
            </button>

            <Link to={"/sets"}>
              <button
                type="button"
                className="flex-1 bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
            </Link>
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
