import { auth } from "@/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guest area",
};

export default async function Account() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ").at(0);
  return (
    <h2 className="mb-7 text-2xl font-semibold text-accent-400">
      Welcome, {firstName}
    </h2>
  );
}
