"use server";

import { auth, signIn, signOut } from "@/auth";
import { getBookings } from "@/lib/data-service";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction() {
  return await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  return await signOut({
    redirectTo: "/",
  });
}

export async function updateGuestAction(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You are not logged in! login to continue");
  const nationalID = formData.get("nationalID") as string;

  if (!/^[a-zA-Z0-9]{6,9}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const [nationality, countryFlag] = formData
    .get("nationality")
    ?.toString()
    .split("%") as string[];

  const payload = { nationality, countryFlag, nationalID };

  const { error } = await supabase
    .from("guests")
    .update(payload)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account");
}

export async function deleteBookingAction(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You are not logged in! login to continue");

  const bookedIDs = (await getBookings(session.user.guestId)).map(
    (booking) => booking.id,
  );

  if (!bookedIDs.includes(bookingId))
    throw new Error("You are not authorized to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateBookingAction(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You are not logged in! login to continue");

  const bookedIDs = (await getBookings(session.user.guestId)).map(
    (booking) => booking.id,
  );

  const bookingId = parseInt(formData.get("bookingId") as string);
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");
  const updatedFields = { numGuests, observations };

  console.log(bookedIDs, bookingId);

  if (!bookedIDs.includes(bookingId))
    throw new Error("You are not authorized to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function createBookingAction(
  bookingData: any,
  formData: FormData,
) {
  const session = await auth();
  if (!session) throw new Error("You are not logged in! login to continue");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    status: "unconfirmed",
    hasBreakfast: false,
    isPaid: false,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${newBooking.cabinId}`);
  redirect("/cabins/thankyou")
}
