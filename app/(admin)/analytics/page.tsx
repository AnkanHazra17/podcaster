"use client"
import AdminHeader from '@/components/AdminHeader';
import LineChart from '@/components/LineChart';
import LoaderSpinner from '@/components/LoaderSpinner';
import UnothorisedPage from '@/components/UnothorisedPage';
import useChartData from '@/hooks/useChartData';
import useRole from '@/hooks/useRole';
import React from 'react'


const Page = () => {
  const {isAdmin, isAdminLoding} = useRole();
  const {isChartLoading, users, podcastNumber, podcasts, views} = useChartData();
  
  if(isAdminLoding && isChartLoading) return <LoaderSpinner></LoaderSpinner>

  if(!isAdmin){
    return <UnothorisedPage></UnothorisedPage>
  }
  return (
    <div className='mt-10 flex flex-col gap-6'>
        <AdminHeader header='Podcaster Analytics' dir='Analytics'></AdminHeader>
        <LineChart 
            labels={users}
            dataArray={podcastNumber}
            labelText="Podcasts"
            bgColor="#F97535"
            borderColor="#F97535"
            title="Number of podcast uploaded by user"
            header="Podcast Vs Users"
        ></LineChart>
        <LineChart
            labels={podcasts}
            dataArray={views}
            labelText="Views"
            bgColor="#F97535"
            borderColor="#F97535"
            title="Number of views in a podcast"
            header="Podcast Vs Views"
        ></LineChart>
    </div>
  )
}

export default Page