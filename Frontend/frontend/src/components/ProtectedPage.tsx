"use client";

import { verifyToken } from "@/services/commonServices";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface Props {
    children:ReactNode
}

export default function ProtectedPage({children}:Props) {
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const router = useRouter()
  useEffect(()=>{
    verifyToken().then((response)=>{
        if(response.data.isUnAuth){
            router.push('/protected')
            setIsAuthenticated(false)
        }else{
            setIsAuthenticated(true)
        }
    }).catch(()=>{
        router.push('/protected')
    })
  },[])
        return <>{isAuthenticated ? children : null}</>
}
