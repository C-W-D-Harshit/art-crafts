import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import MobBar from "@/components/layout/MobBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Art & Crafts",
    template: "%s | Art & Crafts",
  },
  description: "Developed by the one & only HARSHIT!",
  metadataBase: new URL("https://vista-cart.cleverdevloper.in"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: {
      default: "Vista Cart",
      template: "%s | Vista Cart",
    },
    description: "Developed by the one & only HARSHIT!",
    images: [
      {
        url: "https://vista-cart.cleverdevloper.in/og.png",
      },
    ],
    url: "https://vista-cart.cleverdevloper.in/",
    siteName: "Vista Cart",
    locale: "en_US",
    type: "website",
  },
  manifest: "/manifest.json",
  icons: { apple: "/og.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className={`relative flex flex-col min-h-screen`}>
          <Toaster
            toastOptions={{ style: { fontSize: "1.4rem" } }}
            position="top-center"
            reverseOrder={false}
          />
          {/* <NextTopLoader showSpinner={false} color="#5c59e8" /> */}
          <Navbar />
          <div className="flex-grow flex-1">{children}</div>
          <MobBar />
        </main>
      </body>
    </html>
  );
}
