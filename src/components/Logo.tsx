import Image from "next/image";
import Link from "next/link";
import logoImage from "../../public/logo.png";

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image
        src={logoImage}
        quality={90}
        height="60"
        width="60"
        alt="The Wild Oasis logo"
      />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
