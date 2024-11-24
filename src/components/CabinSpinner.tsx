import Spinner from "@/components/Spinner";

export default function CabinSpinner() {
  return (
    <div className="grid place-items-center">
      <Spinner />
      <p className="text-xl text-primary-200">loading cabins...</p>
    </div>
  );
}
