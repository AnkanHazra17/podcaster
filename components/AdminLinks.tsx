"use client"
import { adminSidebarLink } from '@/constants'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as dataIcon from "react-icons/fa";
import * as analyticsIcon from "react-icons/io5";
import React from 'react'

type DataIconNames = keyof typeof dataIcon;
type AnalyticsIconNames = keyof typeof analyticsIcon;

const AdminLinks = ({isMobile}: {isMobile: boolean}) => {
    const pathName = usePathname();
  return (
    <>
        {
            adminSidebarLink.map((adminLink) => {
                const isActive = pathName === adminLink.route || pathName.startsWith(`${adminLink.route}/`)
                const Icon = dataIcon[adminLink.iconName as DataIconNames ] || analyticsIcon[adminLink.iconName as AnalyticsIconNames]
                return (
                    <Link 
                        key={adminLink.label} 
                        href={adminLink.route} 
                        className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start", {"bg-nav-focus border-r-4 border-orange-1": isActive}, {"flex gap-3 items-center py-4 max-lg:px-4 justify-start": isMobile})}>
                        <Icon size={24}></Icon>
                        <p>{adminLink.label}</p>
                    </Link>
                )
            })
        }
    </>
  )
}

export default AdminLinks