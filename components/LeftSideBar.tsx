"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { SignedIn, SignedOut, useClerk, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'
import AdminLinks from './AdminLinks'
import { useAudio } from '@/providers/AudioProvider'

const LeftSideBar = () => {
    const pathName = usePathname();
    const {signOut} = useClerk()
    const router = useRouter();
    const {user} = useUser();
    const {audio} = useAudio();
  return (
    <section className={cn("left_sidebar h-screen", {"h-[calc(100vh-80px)]": audio?.audioUrl})}>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className='flex items-center gap-1 cursor-pointer max-lg:justify-center'>
                <Image src="/icons/logo.svg" alt='logo' width={23} height={27}></Image>
                <h1 className="text-24 font-extrabold text-white-1 max-lg:hidden">Podcaster</h1>
            </Link>

            {
                sidebarLinks.map((item) => {
                    const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`)
                    return (
                        <Link 
                            key={item.label} 
                            href={item.route} 
                            className={cn("flex gap-3 items-center py-3 max-lg:px-4 justify-center lg:justify-start", {"bg-nav-focus border-r-4 border-orange-1": isActive})}>
                            <Image src={item.imgURL} alt={item.label} width={24} height={24}></Image>
                            <p>{item.label}</p>
                        </Link>
                    )
                })
            }

            {
                user?.emailAddresses[0].emailAddress === process.env.NEXT_PUBLIC_ADMIN && (
                    <AdminLinks isMobile={false}></AdminLinks>
                )
            }
        </nav>

        <SignedOut>
            <div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
                <Button className='text-16 w-full bg-orange-1 font-extrabold' asChild>
                    <Link href="sign-in">Log in</Link>
                </Button>
            </div>
        </SignedOut>

        <SignedIn>
            <div className='flex-center w-full pb-14 max-lg:px-4 lg:pr-8'>
                <Button className='text-16 w-full bg-orange-1 font-extrabold' onClick={() => signOut(() => router.push("/"))}>
                    Log out
                </Button>
            </div>
        </SignedIn>
    </section>
  )
}

export default LeftSideBar