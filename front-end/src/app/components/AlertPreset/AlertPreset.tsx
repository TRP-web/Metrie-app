import { IAlertTypeOptions, IUrgentAlert, IUsualAlert } from "@/app/types/IAlert"
import React from "react"
import { Socket } from "socket.io-client"
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
      <>
         <button
            className="uppercase p-4 bg-red-500 text-white font-bold mr-2"
            onClick={() => {
               sendNewUrgentAlert("Outfeed line is down!!!")
            }}
         >{children}</button>
      </>
   )
}
export default AlertPreset