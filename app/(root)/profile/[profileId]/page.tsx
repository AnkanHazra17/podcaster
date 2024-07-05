"use client"
import EmptyState from '@/components/EmptyState'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import Profilecard from '@/components/Profilecard'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const Profile = ({params}: {params: {profileId: string}}) => {
  const user = useQuery(api.users.getUserById, {clerkId: params.profileId})
  const podcastdata = useQuery(api.podcasts.getPodcastsByAuthotId, {authorId: params.profileId})

  console.log(podcastdata)

  if (!user || !podcastdata) return <LoaderSpinner></LoaderSpinner>
  return (
    <section className='mt-9 flex flex-col'>
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>

      <div className='mt-6 flex flex-col gap-6 max-md:items-center md:flex-row'>
        <Profilecard
          podcastData={podcastdata!}
          imageUrl={user.imageUrl}
          userFirstName={user.name}
        ></Profilecard>
      </div>

      <section className='mt-9 flex flex-col gap-5'>
        <h1 className="text-20 font-bold text-white-1">All Podcasts</h1>
        {
          podcastdata && podcastdata.podcasts.length > 0 ? (
            <div className='podcast_grid'>
              {
                podcastdata.podcasts.slice(0, 4).map((podcast) => (
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
              title='You have not created any podcast yet'
              buttonLink='/create-podcast'
              buttonText='Create podcast'
            ></EmptyState>
          )
        }
      </section>
    </section>
  )
}

export default Profile