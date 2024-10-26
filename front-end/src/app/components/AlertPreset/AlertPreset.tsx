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
         className="bg-red-500 flex flex-col items-center mr-2 cursor-pointer max-w-[250px] w-full"
         onClick={() => {
            sendNewUrgentAlert(children)
         }}
      >
         <div className="max-w-[250px]">
            <Image
               src={fishEyes.src}
               alt="fish eyes"
               layout="responsive"
               width={100}
               height={100}
            />
         </div>
         <button
            className="uppercase py-3 bg-red-500 text-white font-bold"

         >{children}</button>
      </div>
   )
}
export default AlertPreset