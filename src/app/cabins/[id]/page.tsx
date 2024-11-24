import Cabin from "@/components/Cabin";
import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import { getCabin, getCabins } from "@/lib/data-service";
import { Suspense } from "react";

interface Props {
  params: { id: number };
}

export async function generateMetadata({ params }: Props) {
  const { name } = await getCabin(params.id);
  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  return cabins.map((cabin) => ({
    id: String(cabin.id),
  }));
}

export default async function Page({ params }: Props) {
  const cabin = await getCabin(params.id);

  return (
    <div className="mx-auto mt-8 max-w-7xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
