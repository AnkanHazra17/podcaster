import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const UnothorisedPage = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <div className='flex items-center flex-col gap-4'>
            <h1 className='text-white-1 text-20'>You are not authorised to access this route</h1>
            <Button className='bg-orange-1' >
                <Link href="/">Home</Link>
            </Button>
        </div>
    </div>
  )
}

export default UnothorisedPage