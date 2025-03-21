import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Componentes" }];
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

export type LoaderData = {
  component: Components;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) throw new Error("Post not found");

  const component = await db.components.findUnique({
    where: { id: +params.id },
  });

  if (!component) throw new Error("Component not found");

  const data = { component };

  return data;
};

export default function Component() {
  const { component } = useLoaderData<LoaderData>();
  return (
    <div>
      <h1>Componentes</h1>
      <ul>
        <li key={component.id}>{component.reference}</li>
      </ul>
    </div>
  );
}
