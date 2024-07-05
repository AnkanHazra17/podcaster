"use client"
import LoaderSpinner from '@/components/LoaderSpinner';
import UnothorisedPage from '@/components/UnothorisedPage';
import useRole from '@/hooks/useRole';
import { redirect } from 'next/navigation';


import React from 'react'

const Page = () => {
  const {isAdmin, isAdminLoding} = useRole();
  

  if(isAdminLoding) return <LoaderSpinner></LoaderSpinner>

  if(!isAdmin){
    return <UnothorisedPage></UnothorisedPage>
  }
  
  return (
    <div className='text-white-1'>Page</div>
  )
}

export default Page