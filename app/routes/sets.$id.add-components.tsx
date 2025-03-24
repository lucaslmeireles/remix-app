import type { ActionFunction, MetaFunction } from "@remix-run/node";
import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useParams,
} from "@remix-run/react";
import { db } from "utils/db.server";
import { Components } from "./components.$id";
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
  const [showModal, setShowModal] = useState(false);
  const [setsCom, setSetsCom] = useState([]);

  useEffect(() => {
    if (actionData !== undefined && actionData.success) {
      setShowModal(true);
      setSetsCom([...setsCom, actionData.componentSet]);
    }
  }, [actionData]);
  return (
    <div>
      {showModal && (
        <div className="z-10 fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2>Sucesso!</h2>
            <p>O seu formulário foi enviado com sucesso.</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-600 text-white p-2 px-3 my-2 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
      <p>Adicionar componente</p>
      <form method="post">
        <select name="component_id">
          {components.map((component) => (
            <option key={component.id} value={component.id}>
              {component.description}
            </option>
          ))}
        </select>
        <input type="number" name="quantity" />
        <input type="number" name="set_id" value={params.id} hidden readOnly />
        <button
          type="submit"
          onClick={() => {
            setSetsCom([...setsCom, setToComponents]);
          }}
        >
          Adicionar
        </button>
      </form>
      <button>
        <a href={`/sets/${params.id}`}>Sair</a>
      </button>
    </div>
  );
}
