/** @format */

import { Skeleton } from "@/components/ui/skeleton";
import BigNumbers from "./kpi-unidade/big-numbers";

type RestaurantUnitDataFallbackProps = {
  description: string;
};

export default function RestaurantUnitDataFallback({
  description,
}: RestaurantUnitDataFallbackProps) {
  return (
    <div
      data-testid="restaurant-unit-loading"
      className="w-full flex gap-5 flex-col justify-start"
    >
      <BigNumbers description={description} />
      <Skeleton className="h-[360px] w-full rounded-xl" />
      <div className="flex gap-5 h-fit w-full flex-col">
        <Skeleton className="h-[320px] w-full rounded-xl" />
        <Skeleton className="h-[320px] w-full rounded-xl" />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 h-full w-full">
        <Skeleton className="h-[320px] w-full rounded-xl" />
        <Skeleton className="h-[320px] w-full rounded-xl" />
      </div>
      <div className="flex flex-col gap-5 mb-5">
        <div className="flex flex-col md:flex-row items-start justify-between gap-5 w-full">
          <Skeleton className="h-[320px] w-full rounded-xl" />
          <Skeleton className="h-[320px] w-full rounded-xl" />
        </div>
        <Skeleton className="h-[420px] w-full rounded-xl" />
        <Skeleton className="h-[520px] w-full rounded-xl" />
        <Skeleton className="h-[520px] w-full rounded-xl" />
        <Skeleton className="h-[320px] w-full rounded-xl" />
        <Skeleton className="h-[320px] w-full rounded-xl" />
        <Skeleton className="h-[320px] w-full rounded-xl" />
      </div>
    </div>
  );
}
