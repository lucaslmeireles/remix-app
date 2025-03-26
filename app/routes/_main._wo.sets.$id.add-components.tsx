import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { useActionData, useLoaderData, useParams } from "@remix-run/react";
import { db } from "utils/db.server";
import { Components } from "./_main.components.$id";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "Adicionar TESTE" }];
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

export const loader = async ({ params }) => {
  const sets = await db.sets.findFirst({
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

  const components = await db.components.findMany();
  return { sets, components };
};

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const component_id = form.get("component_id") ?? "";
  const quantity = form.get("quantity") ?? "";
  const fields = {
    set_id: params.id,
    component_id: Number(component_id),
    quantity: Number(quantity),
  };

  if (fields.set_id === undefined)
    return new Response("Set not found", { status: 404 });
  const componentSet = await db.componentsToSets.create({
    data: {
      Sets: {
        connect: {
          id: +fields.set_id,
        },
      },
      Components: {
        connect: {
          id: fields.component_id,
        },
      },
      quantity: fields.quantity,
    },
  });
  return { componentSet, success: true };
};

export default function AddComponentToSet() {
  const params = useParams();
  const actionData = useActionData();

  const { sets, components } = useLoaderData<{
    sets: Sets;
    components: Components[];
  }>();

  const [setsCom, setSetsCom] = useState([]);

  useEffect(() => {
    if (actionData !== undefined && actionData.success) {
      setSetsCom([...setsCom, actionData.componentSet]);
    }
  }, [actionData]);
  return (
    <div className="w-full  bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Adicionar componente
      </h2>

      <form method="post" className="space-y-4">
        <div>
          <label
            htmlFor="component_id"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Componente
          </label>
          <select
            id="component_id"
            name="component_id"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {components.map((component) => (
              <option key={component.id} value={component.id}>
                {component.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Quantidade
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <input type="number" name="set_id" value={params.id} hidden readOnly />

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            onClick={() => {
              setSetsCom([...setsCom, setToComponents]);
            }}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Adicionar
          </button>

          <a
            href={`/sets/${params.id}`}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-center"
          >
            Sair
          </a>
        </div>
      </form>
    </div>
  );
}
