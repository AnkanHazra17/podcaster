"use client"
import { api } from '@/convex/_generated/api'
import { PodcastCardProps } from '@/types'
import { useUser } from '@clerk/nextjs'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const PodcastCard = ({imgUrl, title, description, podcastId}: PodcastCardProps) => {
    const router = useRouter();
    const updatePodcastViews = useMutation(api.podcasts.updatePodcastviews);
    const {user} = useUser();

    const handleviews = async() => {
        const userId = user?.id;
        const viewedPodcasts = JSON.parse(localStorage.getItem('viewedPodcasts') || '{}') as { [key: string]: string[] };

        if(userId){
            if(!viewedPodcasts[userId] || viewedPodcasts[userId].includes(podcastId)){
                const podcast = await updatePodcastViews({podcastId})

                if (!viewedPodcasts[userId]) {
                viewedPodcasts[userId] = [];
                }
                viewedPodcasts[userId].push(podcastId);
                localStorage.setItem('viewedPodcasts', JSON.stringify(viewedPodcasts));
            }
        }

        router.push(`/podcast/${podcastId}`, {
            scroll: true
        })
    }
  return (
    <div className="cursor-pointer" onClick={handleviews}>
        <figure className="flex flex-col gap-2">
            <Image
                src={imgUrl}
                width={174}
                height={174}
                alt={title}
                className="aspect-square h-full w-full rounded-xl 2xl:size-[200px]"
            ></Image>
            <div className='flex flex-col'>
                <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
                {/* <h2 className="text-12 trincate font-normal capitalize text-white-4">{description}</h2> */}
            </div>
        </figure>
    </div>
  )
}

export default PodcastCard