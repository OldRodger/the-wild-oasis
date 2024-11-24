"use client";

import { useReservation } from "@/context/ReservationContext";
import { cabin } from "@/utils/types";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";

const defaultClassNames = getDefaultClassNames();

function isAlreadyBooked(range: DateRange, datesArr: Array<Date>) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, {
        start: range.from as Date,
        end: range.to as Date,
      }),
    )
  );
}

function DateSelector({
  settings,
  bookedDates,
  cabin,
}: Readonly<{
  settings: {
    minBookingLength: number;
    maxBookingLength: number;
  };
  bookedDates: Array<Date>;
  cabin: cabin;
}>) {
  // CHANGE
  const { range, setRange, resetRange } = useReservation();
  const regularPrice = cabin.regularPrice;
  const discount = cabin.discount;
  const numNights = differenceInDays(range.to as Date, range.from as Date);
  const cabinPrice = (regularPrice - discount) * numNights;
  const displayRange: DateRange = isAlreadyBooked(range, bookedDates)
    ? { from: undefined, to: undefined }
    : range;

  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between md:col-span-2">
      <DayPicker
        className="w-full place-self-center pt-12"
        classNames={{
          months: `${defaultClassNames.months} mx-auto justify-center p-4`,
        }}
        onSelect={setRange}
        selected={displayRange}
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date()}
        // hidden={{ before: new Date() }}
        endMonth={new Date(new Date().getFullYear() + 5, 0)}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
        required
      />

      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {displayRange.from || displayRange.to ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
