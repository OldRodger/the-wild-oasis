function LoginMessage() {
  return (
    <div className="grid bg-primary-800">
      <p className="self-center py-12 text-center text-xl">
        Please{" "}
        <a href="/login" className="text-accent-500 underline">
          login
        </a>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
