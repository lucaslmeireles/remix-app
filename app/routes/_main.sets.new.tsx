import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { redirect, useNavigate } from "@remix-run/react";
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
  const navigate = useNavigate();
  return (
    <div className="container px-2 my-5">
      <span className="h-[2px] w-full bg-black block" />
      <h1 className="font-semibold text-lg">Adicionar conjunto</h1>
      <form className="space-y-4" method="post">
        <label
          htmlFor="ref1"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Referência 1
        </label>
        <input
          type="text"
          id="ref1"
          name="ref1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="ref2"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Referência 2
        </label>
        <input
          type="text"
          id="ref2"
          name="ref2"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="ref3"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Referência 3
        </label>
        <input
          type="text"
          id="ref3"
          name="ref3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="model"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Modelo
        </label>
        <input
          type="text"
          id="model"
          name="model"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Descrição
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="uc"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          UC
        </label>
        <input
          type="text"
          id="uc"
          name="UC"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="rack"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Rack
        </label>
        <input
          type="text"
          id="rack"
          name="rack"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enviar
          </button>
          <button
            type="button"
            className="w-full border border-blue-600 text-blue-600 py-2 px-4 my-2 rounded-md hover:bg-red-600 hover:border-red-600 hover:text-white"
            onClick={() => navigate("/sets")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
