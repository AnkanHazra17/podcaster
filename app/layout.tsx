import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import AudioProvider from "@/providers/AudioProvider";
import useRole from "@/hooks/useRole";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcaster",
  description: "Generate your podcast using AI",
  icons: {
    icon: "/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const role = useRole();
  // console.log("Role: ", role)
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <AudioProvider>
          <body className={inter.className} >
              {children}
          </body>
        </AudioProvider>
      </html>
    </ConvexClerkProvider>
  );
}
