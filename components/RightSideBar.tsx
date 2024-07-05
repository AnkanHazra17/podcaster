"use client"
import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Header from './Header'
import Carousel from './Carousel'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAudio } from '@/providers/AudioProvider'

const RightSideBar = () => {
  const {user} = useUser()
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);
  const router = useRouter();
  const {audio} = useAudio()
  return (
    <section className={cn("right_sidebar h-screen max-h-screen", {"h-[calc(100vh-80px)]": audio?.audioUrl})}>
      <SignedIn>
        <Link
          href={`/profile/${user?.id}`}
          className='flex gap-3'
        >
          <UserButton></UserButton>
          <div className='flex w-full items-center justify-between'>
            <p className='text-16 truncate font-semibold text-white-1'>{user?.firstName} {user?.lastName}</p>
            <Image 
              src="/icons/right-arrow.svg"
              alt="arrow"
              width={24}
              height={24}
            />
          </div>
        </Link>
      </SignedIn>

      <section className='flex flex-col mt-3'>
        <Header headerTitle='Fans Like You'></Header>
        <Carousel fansLikeDetail={topPodcasters!}></Carousel>
      </section>

      <section className='flex flex-col mt-4'>
        <Header headerTitle='Top podcaster'></Header>

        <div className='flex flex-col gap-2 mt-1'>
          {
            topPodcasters?.slice(0, 3).map((podcaster) => (
              <div 
                key={podcaster._id} 
                className='flex cursor-pointer justify-between'
                onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
              >
                <figure className='flex items-center gap-2'>
                  <Image
                    src={podcaster.imageUrl}
                    alt={podcaster.name}
                    width={35}
                    height={35}
                    className='aspect-square rounded-full'
                  ></Image>
                  <h2 className='text-14 font-semibold text-white-1'>{podcaster.name}</h2>
                </figure>
                <div className='flex items-center'>
                  <p className='text-12 font-normal text-white-1'>{podcaster.totalPodcasts} Podcasts</p>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </section>
  )
}

export default RightSideBar