"use client"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs";

const useRole = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoding, setIsAdminLoading] = useState(false);
    const {user} = useUser();

    useEffect(() => {
        const adminSet = () => {
            setIsAdminLoading(true);

            if(user && user.emailAddresses[0].emailAddress === process.env.NEXT_PUBLIC_ADMIN){
                setIsAdmin(true);
            }

            setIsAdminLoading(false)
        }

        adminSet();

    }, [user]);

    return {isAdmin, isAdminLoding}
}

export default useRole