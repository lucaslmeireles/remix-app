import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { Outlet, redirect, useLoaderData, useNavigate } from "@remix-run/react";
import { db } from "utils/db.server";
import { Components } from "./components.$id";

export const meta: MetaFunction = () => {
  return [{ title: "Informações do Conjunto" }];
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
  ComponentsToSets: Components[];
};

export const loader = async ({ params }) => {
  const set = await db.sets.findFirst({
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
  return { set };
};

export default function SetId() {
  const navigate = useNavigate();
  const { set } = useLoaderData<{ set: Sets }>();
  return (
    <div>
      <h1>Conjuntos</h1>
      {set && (
        <div>
          <h2>{set.model}</h2>
          <p>{set.description}</p>
          <p>Ref1: {set.ref1}</p>
          <p>Ref2: {set.ref2}</p>
          <p>Ref3: {set.ref3}</p>
          <p>UC: {set.uc}</p>
          <p>Rack: {set.rack}</p>
          {set.ComponentsToSets.length > 0 && (
            <div>
              <h3>Componentes</h3>
              <ul>
                {set.ComponentsToSets.map((component) => (
                  <li key={component.id}>
                    {component.Components.reference} - {component.quantity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <Outlet />
      <button onClick={() => navigate("/sets")}>Voltar</button>
    </div>
  );
}
