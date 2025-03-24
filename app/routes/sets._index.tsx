import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Componentes" }];
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

export type LoaderData = {
  sets: Sets[];
};

export async function loader() {
  const sets = await db.sets.findMany({
    include: {
      ComponentsToSets: {
        include: {
          Components: true,
        },
      },
    },
  });
  return { sets };
}

export default function Sets() {
  const { sets } = useLoaderData<LoaderData>();
  return (
    <div>
      <h1>Conjuntos</h1>
      <ul>
        {sets.map((set) => (
          <li key={set.id}>
            <a href={`/sets/${set.id}`}>{set.description}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
