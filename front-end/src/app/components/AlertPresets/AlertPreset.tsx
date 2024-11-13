import { IAlertTypeOptions, IUrgentAlert, IUsualAlert } from "@/app/types/IAlert"
import Image from "next/image"
import React from "react"
import { Socket } from "socket.io-client"
interface IAlertPresetProps {
   children: string
   src?: string
   socket: Socket
}
const AlertPreset: React.FC<IAlertPresetProps> = ({ socket, children, src }) => {
   const sendNewUrgentAlert = (text: string, src: string | undefined) => {
      const date: Date = new Date()
      const newAlert: IUsualAlert | IUrgentAlert = {
         text: text,
         id: crypto.randomUUID(),
         type: IAlertTypeOptions.urgent,
         date: date,
         checked: false,
         shown: false,
         src: src
      }
      socket.emit("alert", newAlert)
   }

   return (
      <div
         className="flex flex-col items-center mr-2 cursor-pointer max-w-[250px] min-w-[250px] w-full rounded-md overflow-hidden"
         onClick={() => {
            sendNewUrgentAlert(children, src)
         }}
      >
         <div className="group max-w-[250px] w-full h-full max-h-[250px] overflow-hidden">
            {
               src ?
                  <Image
                     src={src}
                     alt="fish eyes"
                     sizes="100vw"
                     // Make the image display full width
                     width={0}
                     height={0}
                     priority
                     className="w-full h-full transition duration-300 group-hover:scale-110"
                  />
                  : null
            }

         </div>
         <button
            className="uppercase py-3 bg-red-500 text-white font-bold w-full leading-none"

         >{children}</button>
      </div>
   )
}
export default AlertPreset