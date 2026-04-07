/** @format */

import Header from "@/app/(dashboard)/_components/Header";
import type { ReactNode } from "react";

type GeneralUnitPageShellProps = {
  children: ReactNode;
  title: string;
};

export default function GeneralUnitPageShell({
  children,
  title,
}: GeneralUnitPageShellProps) {
  return (
    <main className="flex h-full w-full mx-auto md:ml-auto min-h-screen gap-5 flex-col justify-center bg-zinc-950 overflow-x-hidden py-10 md:px-5">
      <div className="relative md:max-w-[82vw] flex md:ml-auto w-full">
        <div className="bg-zinc-950/50 py-4 w-full md:w-[82vw] backdrop-blur-md fixed top-0 z-40 flex flex-col gap-2">
          <h2 className="text-zinc-50 font-bold md:text-3xl text-center pb-1.5 pt-2.5 text-base">
            Visão Geral -{" "}
            <span className="text-violet-400 text-base md:text-3xl">
              {title}
            </span>
          </h2>
          <div className="hidden lg:block">
            <Header />
          </div>
        </div>
        <div className="w-full h-full flex gap-5 flex-col px-3 md:px-0 mt-12 lg:mt-32">
          {children}
        </div>
      </div>
    </main>
  );
}
