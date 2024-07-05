"use client"
import EmptyState from '@/components/EmptyState';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import SearchBar from '@/components/SearchBar';
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const Discover = ({searchParams: {search}}: {searchParams: {search: string}}) => {
  const podcastData = useQuery(api.podcasts.getPodcastBySearch, {search: search || ""});
  return (
    <div className='flex flex-col gap-9'>
      <SearchBar></SearchBar>

      <div className='flex flex-col gap-9'>
        <h1 className='text-20 font-bold text-white-1'>
          {
            !search ? "Discover trending podcasts" : "Search results for "
          }
          {
            search && <span className='text-orange-1'>{search}</span>
          }
        </h1>
        {
          podcastData ? (
            <>
              {
                podcastData.length > 0 ? (
                  <div className='podcast_grid'>
                    {
                      podcastData.map((podcast) => (
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
                  <EmptyState title='No result found'></EmptyState>
                )
              }
            </>
          ) : (
            <LoaderSpinner></LoaderSpinner>
          )
        }
      </div>
    </div>
  )
}

export default Discover