import type { cabin } from "@/utils/types";
import { getBookedDatesByCabinId, getSettings } from "@/lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { auth } from "@/auth";
import LoginMessage from "./LoginMessage";

export default async function Reservation({ cabin }: { cabin: cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="grid min-h-[400px] border border-primary-800 md:grid-cols-3">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? <ReservationForm cabin={cabin} user={session.user} /> : <LoginMessage />}
    </div>
  );
}
