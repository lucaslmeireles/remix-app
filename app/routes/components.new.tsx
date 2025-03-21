import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

export async function loader() {
  const suppliers = await db.suppliers.findMany();
  return { suppliers };
}

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const reference = form.get("reference") ?? "";
  const cofor = form.get("cofor") ?? "";
  const supplier = form.get("supplier") ?? "";
  const description = form.get("description") ?? "";
  const ua = form.get("UA") ?? "";
  const local = form.get("local") ?? "";
  const fields = {
    reference: String(reference),
    cofor: String(cofor),
    supplier: Number(supplier),
    description: String(description),
    UA: String(ua),
    local: String(local),
  };

  await db.components.create({ data: fields });

  return {
    redirect: "/components",
  };
};

export default function AddComponent() {
  const { suppliers } = useLoaderData<LoaderData>();
  return (
    <div>
      <h1>Adicionar componente</h1>
      <form method="post" className="flex flex-col">
        <label htmlFor="reference">Referencia</label>
        <input type="text" name="reference" />
        <label htmlFor="cofor">Cofor</label>
        <input type="text" name="cofor" />
        <div>
          <label htmlFor="supplier">Fornecedor</label>
          <select name="supplier">
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <label htmlFor="description">Descrição</label>
        <input type="text" name="description" />
        <label htmlFor="UA">UA</label>
        <input type="text" name="UA" />
        <label htmlFor="local">Local</label>
        <input type="text" name="local" />
        <button type="submit" className="bg-blue-400">
          Adicionar
        </button>
      </form>
    </div>
  );
}
