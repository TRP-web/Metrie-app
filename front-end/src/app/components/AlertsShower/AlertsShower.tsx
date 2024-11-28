import React from "react"
import { IAlertTypeOptions, IAnyAlertList, IUrgentAlert, IUsualAlert } from "../../types/IAlert"
import { Socket } from "socket.io-client"
import Alert from "./Alert"
import Image from "next/image"
import Cancel from "@/app/images/cancel-icon-white.png"
interface IAlertsShowerProps {
   alerts: IAnyAlertList
   otherAlerts: IAnyAlertList
   socket: Socket
}


const AlertsShower: React.FC<IAlertsShowerProps> = ({ alerts, socket, otherAlerts }) => {

   const [uncheckedUrgentAlerts, setUncheckedUrgentAlerts] = React.useState<IUrgentAlert[]>([])

   const [blink, setBlink] = React.useState<boolean>(false)

   const closeAlert = () => {
      const id = uncheckedUrgentAlerts[0].id
      const shownAlert = uncheckedUrgentAlerts[0]
      shownAlert.shown = true
      socket.emit("updateAlert", id, shownAlert)
   }

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

   React.useEffect(() => {
      const interval = setInterval(() => {
         if (uncheckedUrgentAlerts.length > 0) {
            setBlink(blink => !blink)
         }
      }, 350);
      return () => clearInterval(interval)
   }, [uncheckedUrgentAlerts])

   const getUrgentAlertStatus = (otherAlert: IUsualAlert | IUrgentAlert): React.ReactNode | null => {
      if (otherAlert.type === IAlertTypeOptions.urgent) {
         if (otherAlert.shown) {
            return (
               <span className="text-green-600 font-bold">
                  checked
               </span>
            )
         } else return <span className="text-red-600 font-bold">unchecked</span>
      } else return null
   }
   return (
      <>
         {
            uncheckedUrgentAlerts.length > 0
               ?
               <>

                  <div className="bg-red-600 left-0 top-0 absolute w-[100%] h-[100vh] text-white phone1:text-6xl notebook:text-8xl font-bold">
                     <div className="relative flex justify-center items-center h-full">
                        <div
                           className="max-w-[50px] max-h-[50px] absolute right-2 top-2"
                           onClick={closeAlert}
                        >
                           <Image
                              src={Cancel.src}
                              alt="cancel"
                              sizes="100vw"
                              width={0}
                              height={0}
                              priority
                              className="w-full h-full cursor-pointer"

                           />
                        </div>
                        {
                           blink ?
                              <span className="phone1:hidden notebook:inline-block text-[300px] font-bold absolute left-6">
                                 !
                              </span>
                              : null
                        }

                        <div className="notebook:max-w-[70%] text-center">

                           {
                              uncheckedUrgentAlerts[0].src ?
                                 <div className="group tablet:max-w-[90%] notebook:max-w-[550px] w-full h-full max-h-[75vh] m-auto px-1">
                                    <Image
                                       src={uncheckedUrgentAlerts[0].src}
                                       alt="fish eyes"
                                       sizes="100vw"
                                       // Make the image display full width
                                       width={0}
                                       height={0}
                                       priority
                                       className="w-full max-h-[75vh] h-full"
                                    />
                                 </div>
                                 : null
                           }


                           <span>
                              {
                                 uncheckedUrgentAlerts[0].text
                              }
                           </span>


                        </div>
                        {
                           blink ?
                              <span className="phone1:hidden notebook:inline-block text-[300px] font-bold absolute right-6">
                                 !
                              </span>
                              : null
                        }
                     </div>
                  </div>
               </>

               :
               null
         }

         <div className="flex items-start justify-around phone1:flex-col tablet:flex-row">
            <div className="w-[70%] phone1:w-full  tablet:w-[60%] notebook:w-[75%] h-[628px] overflow-y-scroll no-scrollbar max-monitor2:h-[400px]">
               { //when no alerts
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
            <div className="w-[27%] tablet:w-[37%] notebook:w-[24%] max-h-[628px] overflow-y-scroll no-scrollbar max-monitor2:max-h-[400px] phone1:w-full">
               { //when no alerts
                  otherAlerts.map((otherAlert, index) => {
                     return (
                        <div className="bg-gray-400 p-2 mb-1 flex justify-between w-full" key={index}>
                           <span className="w-full">
                              {
                                 otherAlert.text
                              }
                           </span>
                           {
                              getUrgentAlertStatus(otherAlert)
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