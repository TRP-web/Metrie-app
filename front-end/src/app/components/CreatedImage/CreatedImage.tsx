import React from "react"
import { HeaderContext, IHeaderContext } from "../HeaderProvider/HeaderProvider"
import Image from "next/image"
import CanseleIcon from "@/app/images/cancel-icon-white.png"


const CreatedImage: React.FC = () => {
   const { image, setImage } = React.useContext(HeaderContext) as IHeaderContext
   return (
      <>
         {
            image ? // image
               <div className="fixed top-9 right-0 border-yellowcus border-[4px]">
                  <Image
                     className="absolute right-1 top-1 cursor-pointer"
                     alt="cansel icon"
                     src={CanseleIcon.src}
                     width={30}
                     height={30}
                     onClick={() => {
                        setImage(null)
                     }}
                  />
                  <div className="max-w-[250px] w-full ">
                     <Image
                        src={image}
                        alt="created image"
                        sizes="100vw"
                        // Make the image display full width
                        width={0}
                        height={0}
                        priority
                        className="w-full"
                     />
                  </div >
               </div>

               : null
         }
      </>

   )
}
export default CreatedImage