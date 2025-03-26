import type { Stock } from "@prisma/client";
import {
  type MetaFunction,
  Link,
  Outlet,
  useLoaderData,
} from "@remix-run/react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Gerenciamento de Estoque" }];
};

export const loader = async () => {
  const stock = await db.stock.findMany({
    include: {
      Components: true,
    },
  });
  return { stock };
};

export default function StockIndex() {
  const { stock } = useLoaderData<{ stock: Stock[] }>();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Gerenciamento de Estoque
          </h1>
          <p className="text-slate-600 mt-1">
            Visualize e gerencie os itens em estoque
          </p>
        </div>

        <Link
          to="/stock/new"
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2 rounded-md font-medium flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Adicionar Estoque
        </Link>
      </div>

      {/* Stock List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">
          Itens em Estoque
        </h2>

        {stock.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stock.map((item) => (
              <Link
                key={item.id}
                to={`/stock/${item.id}`}
                className="border border-slate-200 p-4 rounded-lg hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    {item.type}
                  </span>
                  <span className="text-sm text-slate-500">
                    {new Date(item.updatedAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>

                <h3 className="font-medium text-slate-900 mt-2 line-clamp-1">
                  {item.Components?.description || "Sem descrição"}
                </h3>

                <p className="text-slate-600 text-sm mt-1 line-clamp-1">
                  Ref: {item.Components?.reference || "N/A"}
                </p>

                <div className="mt-auto pt-3 flex justify-between items-center">
                  <div className="text-slate-700">
                    Quantidade:{" "}
                    <span className="font-semibold">{item.quantity}</span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-slate-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-slate-500 mb-4">
              Nenhum item em estoque encontrado.
            </p>
            <Link
              to="/stock/new"
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 py-2 rounded-md font-medium flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Adicionar Estoque
            </Link>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}
