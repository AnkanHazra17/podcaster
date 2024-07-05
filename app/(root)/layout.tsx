import LeftSideBar from "@/components/LeftSideBar";
import MobileNav from "@/components/MobileNav";
import RightSideBar from "@/components/RightSideBar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster"
import PodcastPlayer from "@/components/PodcastPlayer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col no-scrollbar h-screen relative">
        <main className="flex bg-black-3 no-scrollbar">
            <LeftSideBar></LeftSideBar>

            <section className="flex min-h-screen flex-1 flex-col sm:px-14">
                <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
                    <div className="flex h-16 items-center justify-between md:hidden">
                      <Image src="/icons/logo.svg" alt="logo" width={30} height={30}></Image>
                      <MobileNav></MobileNav>
                    </div>
                    <div className="flex flex-col md:pb-14">
                      <Toaster></Toaster>
                      {children}
                    </div>
                </div>
            </section>
            <RightSideBar></RightSideBar>
        </main>
        
        <PodcastPlayer></PodcastPlayer>
        
    </div>
  );
}
