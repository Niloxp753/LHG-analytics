/** @format */

import BigNumbers from "@/app/(dashboard)/_components/bignumber";
import { Skeleton } from "@/components/ui/skeleton";

type GeneralUnitDataFallbackProps = {
  rangeDescription: string;
};

export default function GeneralUnitDataFallback({
  rangeDescription,
}: GeneralUnitDataFallbackProps) {
  return (
    <div
      data-testid="general-unit-loading"
      className="w-full h-full flex gap-5 flex-col"
    >
      <BigNumbers description={rangeDescription} />
      <Skeleton className="h-[420px] w-full rounded-xl" />
      <div className="gap-5 h-fit w-full grid md:grid-cols-2">
        <Skeleton className="h-[420px] w-full rounded-xl" />
        <div className="w-full flex gap-5 justify-between flex-col">
          <Skeleton className="h-[220px] w-full rounded-xl" />
          <Skeleton className="h-[220px] w-full rounded-xl" />
        </div>
      </div>
      <div className="flex gap-5 flex-col items-center">
        <Skeleton className="h-[360px] w-full rounded-xl" />
        <Skeleton className="h-[360px] w-full rounded-xl" />
        <Skeleton className="h-[360px] w-full rounded-xl" />
        <Skeleton className="h-[360px] w-full rounded-xl" />
      </div>
      <div className="flex flex-col h-full w-full gap-5">
        <Skeleton className="h-[360px] w-full rounded-xl" />
        <Skeleton className="h-[360px] w-full rounded-xl" />
      </div>
      <Skeleton className="h-[420px] w-full rounded-xl" />
      <div className="flex gap-5 flex-col w-full">
        <Skeleton className="h-[320px] w-full rounded-xl" />
        <Skeleton className="h-[320px] w-full rounded-xl" />
        <Skeleton className="h-[320px] w-full rounded-xl" />
      </div>
    </div>
  );
}
