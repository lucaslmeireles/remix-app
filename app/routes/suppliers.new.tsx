import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { db } from "utils/db.server";
import { SupplierType } from "@prisma/client";
export const meta: MetaFunction = () => {
  return [{ title: "Adicionar Fornecedor" }];
};

export type Suppliers = {
  id: number;
  name: string;
};

export type LoaderData = {
  suppliers: Suppliers[];
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const name = form.get("name") ?? "";
  const address = form.get("address") ?? "";
  const phone = form.get("phone") ?? "";
  const type = form.get("type") ?? "";
  const fields = {
    name: String(name),
    address: String(address),
    phone: String(phone),
    type: String(type) as SupplierType,
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
    redirect: "/components",
  };
};

export default function AddComponent() {
  return (
    <div>
      <h1>Adicionar fornecedor</h1>
      <form method="post" className="flex flex-col">
        <label htmlFor="name">Nome</label>
        <input type="text" name="name" />
        <label htmlFor="address">Endereço</label>
        <input type="text" name="address" />
        <label htmlFor="phone">Telefone</label>
        <input type="text" name="phone" />
        <div>
          <label htmlFor="type">Tipo de fornecedor</label>
          <select name="type">
            {Object.entries(SupplierType).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-400">
          Adicionar
        </button>
      </form>
    </div>
  );
}
