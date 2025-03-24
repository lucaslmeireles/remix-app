import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { redirect, useNavigate } from "@remix-run/react";
import { db } from "utils/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Adicionar Conjunto" }];
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

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const ref1 = form.get("ref1") ?? "";
  const ref2 = form.get("ref2") ?? "";
  const ref3 = form.get("ref3") ?? "";
  const model = form.get("model") ?? "";
  const description = form.get("description") ?? "";
  const uc = form.get("uc") ?? "";
  const rack = form.get("rack") ?? "";
  const fields = {
    ref1: String(ref1),
    ref2: String(ref2),
    ref3: String(ref3),
    model: String(model),
    description: String(description),
    uc: String(uc),
    rack: String(rack),
  };

  const newSet = await db.sets.create({
    data: {
      ref1: fields.ref1,
      ref2: fields.ref2,
      ref3: fields.ref3,
      model: fields.model,
      description: fields.description,
      uc: fields.uc,
      rack: fields.rack,
    },
  });

  return redirect(`/sets/${newSet.id}`);
};

export default function AddSet() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Conjuntos</h1>
      <form method="post" action="/sets/new">
        <label htmlFor="ref1">Ref1</label>
        <input type="text" name="ref1" />
        <label htmlFor="ref2">Ref2</label>
        <input type="text" name="ref2" />
        <label htmlFor="ref3">Ref3</label>
        <input type="text" name="ref3" />
        <label htmlFor="model">Modelo</label>
        <input type="text" name="model" />
        <label htmlFor="description">Descrição</label>
        <input type="text" name="description" />
        <label htmlFor="uc">UC</label>
        <input type="text" name="uc" />
        <label htmlFor="rack">Rack</label>
        <input type="text" name="rack" />
        <button type="submit">Adicionar</button>
      </form>
      <button onClick={() => navigate(-1)}>Cancelar</button>
    </div>
  );
}
