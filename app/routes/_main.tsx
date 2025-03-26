import { Outlet } from "@remix-run/react";
import { Header } from "~/components/Header";

export default function AppLayout() {
  return (
    <>
      <Header />
      <main className="w-full h-full">
        <Outlet />
      </main>
    </>
  );
}
