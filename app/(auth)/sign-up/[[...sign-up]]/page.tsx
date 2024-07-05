
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return (
    <div className='flex-center galssmorphism-auth h-screen w-full'>
        <SignUp></SignUp>
    </div>
  )
}

export default Page