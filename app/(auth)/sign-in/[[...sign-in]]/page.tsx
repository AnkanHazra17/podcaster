
import { SignIn } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
  return (
    <div className="flex-center galssmorphism-auth h-screen w-full">
        <SignIn></SignIn>
    </div>
  )
}

export default Page