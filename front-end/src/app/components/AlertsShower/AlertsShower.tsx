import React from "react"
import { IAlertType, IAlertTypeOptions, IAnyAlertList, IUrgentAlert, IUsualAlert } from "../../types/IAlert"
import { Socket } from "socket.io-client"
import Alert from "./Alert"

interface IAlertsShowerProps {
   alerts: IAnyAlertList
   otherAlerts: IAnyAlertList
   socket: Socket
}


const AlertsShower: React.FC<IAlertsShowerProps> = ({ alerts, socket, otherAlerts }) => {

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

         <div className="flex items-start justify-around ">
            <div className="w-[70%] max-h-[628px] overflow-y-scroll no-scrollbar max-monitor2:max-h-[400px]">
               {
                  alerts.map((alert, index) => {
                     return (
                        <Alert
                           alert={alert}
                           key={index}
                           socket={socket}
                        />
                     )
                  })
               }
            </div>
            <div className="w-[27%] max-h-[628px] overflow-y-scroll no-scrollbar max-monitor2:max-h-[400px]">
               {
                  otherAlerts.map((otherAlert, index) => {
                     return (
                        <div className="w-full bg-gray-400 p-2 mb-1" key={index}>
                           {
                              otherAlert.text
                           }
                        </div>
                     )
                  })
               }
            </div>
         </div>
      </>
   )
}
export default AlertsShower