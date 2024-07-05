"use client"
import EmptyState from '@/components/EmptyState'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import PodcastDetailPlayer from '@/components/PodcastDetailPlayer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

const PodcastDetails = ({params: {podcastId}}: {params: {podcastId: Id<"podcasts">}}) => {

  const podcast = useQuery(api.podcasts.getPodcastById, {podcastId})
  const similarPodcasts = useQuery(api.podcasts.getPodcastsByVoiceType, {podcastId})

  const {user} = useUser();

  const isOwner = user?.id === podcast?.authorId;

  if(!podcast || !similarPodcasts){
    return <LoaderSpinner></LoaderSpinner>
  }
  return (
    <section className='flex w-full flex-col'>
      <header className='mt-9 flex items-center justify-between'>
        <h1 className='text-20 font-bold text-white-1'>Currently Playing</h1>

        <figure className='flex gap-3'>
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt='headphone'
          ></Image>
          <h2 className='text-16 font-bold text-white-1'>{podcast?.views}</h2>
        </figure>
      </header>

      <PodcastDetailPlayer
        isOwner={isOwner}
        podcastId={podcast._id}
        imageUrl={podcast?.imageUrl!}
        audioUrl={podcast.audioUrl!}
        podcastTitle={podcast.podcastTitle}
        author={podcast.author}
        imageStorageId={podcast.imageStorageId!}
        audioStorageId={podcast.audioStorageId!}
        authorImageUrl={podcast.authorImageUrl}
        authorId={podcast.authorId}
      ></PodcastDetailPlayer>

      <p className="text-white-2 txt-16 pb-8 pt-[45px] font-medium max-md:text-center">{podcast?.podcastDescription}</p>

      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-bold text-white-1'>Transcription</h1>
          <p className='text-16 font-medium text-white-2'>{podcast?.voicePromt}</p>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-bold text-white-1'>Thumbnail Prompt</h1>
          <p className='text-16 font-medium text-white-2'>{podcast?.imagePromt}</p>
        </div>
      </div>

      <section className="mt-8 flex flex-col gap-5">
        <h1 className='text-20 font-bold text-white-1'>Similar Podcasts</h1>

        {
          similarPodcasts && similarPodcasts.length > 0 ? (
            <div className="podcast_grid">
              {
                similarPodcasts?.map((podcast) => (
                  <PodcastCard
                    key={podcast._id}
                    imgUrl={podcast.imageUrl!}
                    title={podcast.podcastTitle}
                    description={podcast.podcastDescription}
                    podcastId={podcast._id}
                  ></PodcastCard>
                ))
              }
            </div>
          ) : (
            <EmptyState
              title='No similar podcasts found'
              buttonLink='/discover'
              buttonText='Discover more podcasts'
            ></EmptyState>
          )
        }
      </section>
    </section>
  )
}

export default PodcastDetails