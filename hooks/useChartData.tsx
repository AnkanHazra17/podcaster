"use client"
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import React, { useEffect, useState } from 'react'

const useChartData = () => {
  const alluserData = useQuery(api.users.getAllUserdata);
  const allPodcastdata = useQuery(api.podcasts.getAllPodcast);

  const [users, setUsers] = useState<string[]>([])
  const [podcastNumber, setPodcastNumber] = useState<number[]>([]);
  const [podcasts, setPodcasts] = useState<string[]>([]);
  const [views, setViews] = useState<number[]>([]);
  const [isChartLoading, setIsChartLoading] = useState(false);

  const processData = () => {
    if(alluserData && allPodcastdata){

        setIsChartLoading(true);
        const userlabels = alluserData.map((user) => (
            user.userName
        ))
        setUsers(userlabels)
        const podcasts = alluserData.map((user) => (
            user.podcasts
        ))
        setPodcastNumber(podcasts)
        const podcastLabels = allPodcastdata.map((podcast) => (
            podcast.podcastTitle
        ))
        setPodcasts(podcastLabels);
    
        const podcastViews = allPodcastdata.map((podcast) => (
            podcast.views
        ))
        setViews(podcastViews)
        setIsChartLoading(false);
    }
  }

  useEffect(() => {
    if(alluserData && allPodcastdata){
        processData();
    }

  }, [alluserData, allPodcastdata])

  return {isChartLoading, users, podcastNumber, podcasts, views}
}

export default useChartData
