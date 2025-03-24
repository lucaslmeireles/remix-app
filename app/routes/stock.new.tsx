import { StockType } from "@prisma/client";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { db } from "utils/db.server";
import { Components } from "./components.$id";

export const meta: MetaFunction = () => {
  return [{ title: "Adicionar Estoque" }];
};

export const loader = async () => {
  const components = await db.components.findMany();
  return { components };
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const component_id = form.get("component_id") ?? "";
  const quantity = form.get("quantity") ?? "";
  const type = form.get("type") ?? "";
  const fields = {
    component_id: String(component_id),
    quantity: Number(quantity),
    type: Number(type),
  };

  await db.stock.create({
    data: {
      Components: {
        connect: {
          id: +fields.component_id,
        },
      },
      quantity: fields.quantity,
      type: type,
    },
  });
};

export default function AddStock() {
  const { components } = useLoaderData<{ components: Components[] }>();
  return (
    <div>
      <h1>Adicionar Estoque</h1>
      <form method="post" className="flex flex-col">
        <label htmlFor="component_id">Produto</label>
        <select name="component_id">
          {components.map((component) => (
            <option key={component.id} value={component.id}>
              {component.description} - {component.description}
            </option>
          ))}
        </select>
        <label htmlFor="quantity">Quantidade</label>
        <input type="text" name="quantity" />
        <label htmlFor="type">Tipo</label>
        <select name="type">
          {Object.entries(StockType).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}
