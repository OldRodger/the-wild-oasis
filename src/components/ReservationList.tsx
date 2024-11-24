"use client";

import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { booking } from "@/utils/types";
import { deleteBookingAction } from "@/app/_actions";

export default function ReservationList({ bookings }: { bookings: any[] }) {
  const [optimisticBooking, optimisticDelete] = useOptimistic(
    bookings,
    (curState, bookingId) =>
      curState.filter((booking) => booking.id !== bookingId),
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBookingAction(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBooking.map((booking) => (
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
