import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import AppDataTable from './AppDataTable'


const CustomTab = ({value1, value2, title1, title2}: {value1: string, value2: string, title1: string, title2: string}) => {
  
  
  return (
    <Tabs defaultValue={value1} className="w-full">
        <TabsList className="grid grid-cols-2 w-[300px] rounded-xl">
          <TabsTrigger value={value1} className='rounded-xl'>{title1}</TabsTrigger>
          <TabsTrigger value={value2} className='rounded-xl'>{title2}</TabsTrigger>
        </TabsList>
        <div className='mt-8 w-full'>
          <TabsContent value={value1} className='w-full'>
            <AppDataTable type='users'></AppDataTable>
          </TabsContent>
          <TabsContent value={value2}>
            <AppDataTable type='podcast'></AppDataTable>
          </TabsContent>
        </div>
      </Tabs>
  )
}

export default CustomTab