import React from "react"
import { IAlertType, IAlertTypeOptions, IAnyAlertList } from "../types/IAlert"
import { Socket } from "socket.io-client"

interface IAlertsShowerProps {
   alerts: IAnyAlertList
   setAlerts: React.Dispatch<React.SetStateAction<IAnyAlertList>>
   socket: Socket
}


const AlertsShower: React.FC<IAlertsShowerProps> = ({ alerts, socket, setAlerts }) => {


   React.useEffect(() => {
      socket.on("removeAlertResponse", (msg) => {
         setAlerts(msg)
      })
   }, [])

   const getStyleByType = (type: IAlertType): string => {
      switch (type) {
         case IAlertTypeOptions.urgent:
            return "bg-red-600"

         case IAlertTypeOptions.normal:
            return "bg-yellowcus"

         case IAlertTypeOptions.keepGoing:
            return "bg-gray-600"
      }
   }

   return (
      <>
         <div className="">
            {
               alerts.map((alert, index) => {
                  return (
                     <div className={`p-5 text-5xl mb-2 text-white flex justify-between ${getStyleByType(alert.type)}`} key={index}>
                        <span>
                           {alert.text}
                        </span>
                        <div className="flex items-center">
                           <span className="mr-3">
                              {`${new Date(alert.date).getHours()}:${new Date(alert.date).getMinutes()}`}
                           </span>
                           <div
                              className="w-8 h-8 bg-white cursor-pointer"
                              onClick={() => {
                                 socket.emit("removeAlert", alert)
                              }}
                           ></div>
                        </div>
                     </div>
                  )
               })
            }
         </div>
      </>
   )
}
export default AlertsShower