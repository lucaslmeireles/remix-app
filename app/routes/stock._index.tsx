import { Stock } from "@prisma/client";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import { c } from "node_modules/vite/dist/node/moduleRunnerTransport.d-CXw_Ws6P";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Adicionar Estoque" }];
};

export const loader = async () => {
  const stock = await db.stock.findMany({
    include: {
      Components: true,
    },
  });
  return { stock };
};

export default function Stock() {
  const { stock } = useLoaderData<{ stock: Stock[] }>();

  return (
    <div>
      <h1>Estoque</h1>
      <ul>
        {stock.map((stock) => (
          <li key={stock.id}>
            <a href={`/stock/${stock.id}`}>
              <p>{stock.component[0].description}</p>
              <p>{stock.component[0].reference}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
