"use client";

import { useFormStatus } from "react-dom";

export default function UpdateButton({
  pendingFlag,
  children,
}: Readonly<{
  pendingFlag?: string;
  children: string;
}>) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:animate-pulse disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? pendingFlag || "Updating..." : children}
    </button>
  );
}
