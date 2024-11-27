"use client"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import BackIcon from "../../images/arrow.png"
import CameraIcon from "@/app/images/camera.png"
import Image from "next/image"
import CancelIcon from "@/app/images/cancel-icon-white.png"
import IPages from "@/app/types/IPages"
import Camera from "../Camera/Camera"


const Header: React.FC = () => {
   const router = useRouter()
   const path = usePathname()
   const [photoPopup, setPhotopopup] = React.useState<boolean>(false)

   const getTitle = (path: string): string | undefined => {
      switch (path) {
         case IPages.outfeed:
            return "Outfeed Alerts"
         case IPages.prime:
            return "Prime Alerts"
      }
   }

   return (
      <>
         {
            photoPopup ?
               <div className="w-full h-[100vh] absolute z-10 bg-black/25 top-0 left-0 flex justify-center items-center">
                  <div className="bg-white monitor1:max-w-[1300px] p-3 w-full">
                     <div className="flex items-center justify-between">
                        <h2 className="text-3xl">Make an image</h2>
                        <button
                           onClick={() => {
                              setPhotopopup(false)
                           }}
                           className="h-[58px] w-[58px] bg-yellowcus rounded-md p-1">
                           <Image src={CancelIcon.src} width={50} height={50} alt="cansel icon" />
                        </button>
                     </div>
                     <Camera />
                  </div>
               </div>
               : null
         }

         {
            path === IPages.outfeed || path === IPages.prime ?
               <header
                  className=" flex justify-between border-b-[2px] border-b-purplecus"
               >
                  <div
                     onClick={() => { router.push("/") }}
                     className="max-w-[37px] w-full h-full max-h-[33px] overflow-hidden cursor-pointer"
                  >
                     <Image
                        src={BackIcon.src}
                        alt="back icon"
                        sizes="100vw"
                        // Make the image display full width
                        width={0}
                        height={0}
                        priority
                        className="w-full h-full"
                     />
                  </div>
                  <h1 className="text-center text-2xl">
                     {
                        getTitle(path)
                     }
                  </h1>
                  {
                     path === IPages.outfeed ?
                        <button className="mr-2"
                           onClick={() => {
                              setPhotopopup(true)
                           }}
                        >
                           <Image src={CameraIcon.src} width={30} height={30} alt="camera icon" />
                        </button>
                        : <span></span>
                  }

               </header>
               : null
         }
      </>
   )
}
export default Header