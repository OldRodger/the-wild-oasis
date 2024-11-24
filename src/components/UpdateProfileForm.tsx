"use client";

import { updateGuestAction } from "@/app/_actions";
import React from "react";
import { useFormStatus } from "react-dom";
import UpdateButton from "./UpdateButton";

export default function UpdateProfileForm({
  guest,
  children,
}: Readonly<{
  guest: any;
  children: React.ReactNode;
}>) {
  // CHANGE
  // const countryFlag = "/pt.jpg";
  // const nationality = "portugal";


  return (
    <form
      action={updateGuestAction}
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          name="fullName"
          defaultValue={guest.fullName}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          name="email"
          defaultValue={guest.email}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={guest.countryFlag}
            width={50}
            height={50}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        {/* SELECT COUNTRY COMPONENT */}
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={guest.nationalID}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <UpdateButton> Update profile </UpdateButton>
      </div>
    </form>
  );
}
