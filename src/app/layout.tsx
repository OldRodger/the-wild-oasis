import Header from "@/components/Header";
import { ReservationProvider } from "@/context/ReservationContext";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: {
    default: "Welcome / The Wild Oasis",
    template: "%s / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

const josefinsans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative flex min-h-screen flex-col bg-primary-950 text-primary-100 ${josefinsans.className}`}
      >
        <Header />
        <div className="grid flex-1 px-8 py-12">
          <main className="mx-auto w-full max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
