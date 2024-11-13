import { useRouter } from "next/navigation"
import React from "react"
import BackIcon from "../images/arrow.png"
import Image from "next/image"
interface IHeaderProps {
   children: string
}
const Header: React.FC<IHeaderProps> = ({ children }) => {
   const router = useRouter()
   return (
      <>
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
               {children}
            </h1>
            <span></span>

         </header>
      </>
   )
}
export default Header