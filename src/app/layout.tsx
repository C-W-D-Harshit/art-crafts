import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";

import MobBar from "@/components/layout/MobBar";
import TopLoader from "@/components/loaders/TopLoader";
import LayoutProvider from "@/providers/LayoutProvider";
import AuthSessionProvider from "@/providers/AuthSessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Art & Crafts",
    template: "%s | Art & Crafts",
  },
  description: "Developed by the one & only HARSHIT!",
  metadataBase: new URL("https://arts&crafts.cleverdevloper.in"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: {
      default: "Art & Crafts",
      template: "%s | Art & Crafts",
    },
    description: "Developed by the one & only HARSHIT!",
    images: [
      {
        url: "https://arts&crafts.cleverdevloper.in/og.png",
      },
    ],
    url: "https://arts&crafts.cleverdevloper.in/",
    siteName: "Art & Crafts",
    locale: "en_US",
    type: "website",
  },
  // manifest: "/manifest.json",
  // icons: { apple: "/og.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("relative h-full font-sans antialiased", inter.className)}
      >
        <main className={`relative flex flex-col min-h-screen`}>
          <Toaster
            toastOptions={{ style: { fontSize: "1rem" } }}
            position="top-center"
            reverseOrder={false}
          />
          <TopLoader />
          <AuthSessionProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </AuthSessionProvider>
        </main>
      </body>
    </html>
  );
}
