import { auth } from "@/auth";
import SelectCountry from "@/components/SelectCountry";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { getGuest } from "@/lib/data-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update your profile",
};

export default async function Page() {
  // CHANGE
  // const countryFlag = "/pt.jpg";
  // const nationality = "portugal";

  const session = await auth();
  const guest = await getGuest(session?.user.email);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400">
        Update your guest profile
      </h2>

      <p className="mb-8 text-lg text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
