import React from 'react'

const AdminHeader = ({header, dir}: {header: string, dir: string}) => {
  return (
    <div className='flex flex-col gap-2'>
        <p className='text-white-2 text-[12px]'>Admin / Dashboard <span className='text-orange-1'>/ {dir}</span></p>
        <p className='text-20 font-bold text-white-1'>{header}</p>
    </div>
  )
}

export default AdminHeader