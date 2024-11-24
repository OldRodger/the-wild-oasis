function NotFound() {
  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">
        cabin could not be found :(
      </h1>
      <a
        href="/cabins"
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
      >
        Go back to cabins
      </a>
    </main>
  );
}

export default NotFound;
