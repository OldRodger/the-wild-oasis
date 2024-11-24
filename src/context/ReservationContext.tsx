"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  use,
  useState,
} from "react";
import { DateRange } from "react-day-picker";

//  CONTEXT
const ReservationContext = createContext<
  | {
      range: DateRange;
      setRange: Dispatch<SetStateAction<DateRange>>;
      resetRange: () => void;
    }
  | undefined
>(undefined);

// INITIAL STATE
const initialState = {
  from: undefined,
  to: undefined,
};

// CONTEXT PROVIDER
export function ReservationProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [range, setRange] = useState<DateRange>(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        resetRange,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

// CONTEXT HOOK
export function useReservation() {
  const context = use(ReservationContext);
  if (!context || context == undefined)
    throw new Error("useReservation() was used outside context provider");
  return context;
}
