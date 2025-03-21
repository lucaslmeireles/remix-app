import type { MetaFunction } from "@remix-run/node";
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
  components: Components[];
};

export async function loader() {
  const components = await db.components.findMany();
  return { components };
}

export default function Components() {
  const { components } = useLoaderData<LoaderData>();
  return (
    <div>
      <h1>Componentes</h1>
      <ul>
        {components.map((component) => (
          <li key={component.id}>{component.reference}</li>
        ))}
      </ul>
    </div>
  );
}
