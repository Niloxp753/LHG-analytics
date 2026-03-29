/** @format */

import { Skeleton } from "@/components/ui/skeleton";
import BigNumbersEcommerce from "./big-numbers-ecommerce";
import BigNumbersReservation from "./big-numbers-reservations";

type ReservationsUnitDataFallbackProps = {
  description: string;
};

export default function ReservationsUnitDataFallback({
  description,
}: ReservationsUnitDataFallbackProps) {
  return (
    <div
      data-testid="reservations-unit-loading"
      className="w-full h-full flex gap-5 flex-col"
    >
      <BigNumbersReservation description={description} />
      <Skeleton className="h-[360px] w-full rounded-xl" />
      <div className="flex flex-col md:flex-row w-full gap-5">
        <Skeleton className="h-[340px] w-full rounded-xl" />
        <Skeleton className="h-[340px] w-full rounded-xl" />
      </div>
      <div className="grid grid-cols-1 w-full gap-5">
        <Skeleton className="h-[360px] w-full rounded-xl" />
        <Skeleton className="h-[360px] w-full rounded-xl" />
        <Skeleton className="h-[360px] w-full rounded-xl" />
      </div>
      <Skeleton className="h-[260px] w-full rounded-xl" />
      <div className="flex gap-5 flex-col w-full">
        <Skeleton className="h-[48px] w-[320px] rounded-xl" />
        <BigNumbersEcommerce description={description} />
        <div className="w-full flex flex-col items-center justify-between gap-5">
          <Skeleton className="h-[360px] w-full rounded-xl" />
          <Skeleton className="h-[360px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
