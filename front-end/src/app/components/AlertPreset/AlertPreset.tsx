import { IAlertTypeOptions, IUrgentAlert, IUsualAlert } from "@/app/types/IAlert"
import Image from "next/image"
import React from "react"
import { Socket } from "socket.io-client"
import fishEyes from "./fish_eyes.jpg"
interface IAlertPresetProps {
   children: string
   socket: Socket
}
const AlertPreset: React.FC<IAlertPresetProps> = ({ socket, children }) => {
   const sendNewUrgentAlert = (text: string) => {
      const date: Date = new Date()
      const newAlert: IUsualAlert | IUrgentAlert = {
         text: text,
         id: crypto.randomUUID(),
         type: IAlertTypeOptions.urgent,
         date: date,
         checked: false,
         shown: false
      }
      socket.emit("alert", newAlert)
   }
   return (
      <div
         className="flex flex-col items-center mr-2 cursor-pointer max-w-[250px] min-w-[250px] w-full rounded-md overflow-hidden"
         onClick={() => {
            sendNewUrgentAlert(children)
         }}
      >
         <div className="max-w-[250px] w-full h-full max-h-[250px]">
            <Image
               src={fishEyes.src}
               alt="fish eyes"
               sizes="100vw"
               // Make the image display full width
               width={0}
               height={0}
               priority
               className="w-full h-full"
            />
         </div>
         <button
            className="uppercase py-3 bg-red-500 text-white font-bold w-full leading-none"

         >{children}</button>
      </div>
   )
}
export default AlertPreset