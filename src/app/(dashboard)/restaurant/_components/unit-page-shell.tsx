/** @format */

import Header from "@/app/(dashboard)/_components/Header";
import type { ReactNode } from "react";

type RestaurantUnitPageShellProps = {
  children: ReactNode;
  title: string;
};

export default function RestaurantUnitPageShell({
  children,
  title,
}: RestaurantUnitPageShellProps) {
  return (
    <main className="flex h-full w-full min-h-screen gap-2 flex-col justify-center bg-zinc-950 overflow-x-hidden px-3 md:px-5 py-10">
      <div className="relative w-full md:max-w-[82vw] md:ml-auto flex z-40">
        <div className="bg-zinc-950/50 z-40 py-4 ml-auto w-full md:w-[82vw] backdrop-blur-md fixed top-0 flex flex-col gap-2 justify-end">
          <h2 className="text-zinc-50 font-bold md:text-3xl text-center py-2 text-base">
            Restaurante -{" "}
            <span className="text-violet-400 text-base md:text-3xl">
              {title}
            </span>
          </h2>
          <div className="hidden lg:block">
            <Header />
          </div>
        </div>
        <div className="w-full flex gap-5 flex-col justify-start mt-12 lg:mt-32">
          {children}
        </div>
      </div>
    </main>
  );
}
