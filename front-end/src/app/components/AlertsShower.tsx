import React from "react"
import { IAlertType, IAlertTypeOptions, IAnyAlertList, IUrgentAlert } from "../types/IAlert"
import { Socket } from "socket.io-client"

interface IAlertsShowerProps {
   alerts: IAnyAlertList
   socket: Socket
}


const AlertsShower: React.FC<IAlertsShowerProps> = ({ alerts, socket, }) => {

   const [uncheckedUrgentAlerts, setUncheckedUrgentAlerts] = React.useState<IUrgentAlert[]>([])

   React.useEffect(() => {
      let newUrgentArray: IUrgentAlert[] = []
      alerts.forEach((alert) => {
         if (
            alert.type === IAlertTypeOptions.urgent &&
            alert.shown === false
         ) {
            newUrgentArray.unshift(alert)
         }
      })
      setUncheckedUrgentAlerts(newUrgentArray)
   }, [alerts])

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
         {
            uncheckedUrgentAlerts.length > 0
               ?
               <div className="bg-red-600 left-0 top-0 absolute w-[100vw] h-[100vh] text-white text-7xl font-bold flex justify-center items-center">
                  <div
                     className="w-12 h-12 bg-white cursor-pointer mr-10"
                     onClick={() => {
                        const id = uncheckedUrgentAlerts[0].id
                        const shownAlert = uncheckedUrgentAlerts[0]
                        shownAlert.shown = true

                        socket.emit("updateAlert", id, shownAlert)
                     }}
                  ></div>
                  <span>
                     {
                        uncheckedUrgentAlerts[0].text
                     }
                  </span>
               </div>
               :
               null
         }

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