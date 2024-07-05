"use client"
import AdminHeader from '@/components/AdminHeader';
import AppDataTable from '@/components/AppDataTable';
import CustomTab from '@/components/CustomTab';
import LoaderSpinner from '@/components/LoaderSpinner';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UnothorisedPage from '@/components/UnothorisedPage';
import useRole from '@/hooks/useRole';
import { cn } from '@/lib/utils';
import { TabsContent } from '@radix-ui/react-tabs';
import { redirect } from 'next/navigation';


import React from 'react'

const Page = () => {
  const {isAdmin, isAdminLoding} = useRole();
  
  if(isAdminLoding) return <LoaderSpinner></LoaderSpinner>

  if(!isAdmin){
    return <UnothorisedPage></UnothorisedPage>
  }

  return (
    <div className='mt-10 flex flex-col gap-6'>
      <AdminHeader header='Podcaster All Data' dir='All data'></AdminHeader>
      <CustomTab 
        value1='user'
        value2='podcast'
        title1='Users'
        title2='Podcasts'
      ></CustomTab>
    </div>
  )
}

export default Page