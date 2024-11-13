import { IAlertType, IAlertTypeOptions, IUrgentAlert, IUsualAlert } from "@/app/types/IAlert"
import Image from "next/image"
import React from "react"
import { Socket } from "socket.io-client"
import Cancel from "@/app/images/cancel-icon-white.png"
interface IAlertProps {
   alert: IUrgentAlert | IUsualAlert
   socket: Socket
}

const Alert: React.FC<IAlertProps> = ({ alert, socket }) => {
   const [alertTimePassed, setAlertTimePassed] = React.useState<string>("")
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

   const getTimePassed = (datePosted: Date) => {
      const dateNow: number = new Date().getTime()
      const timePassed = dateNow - new Date(datePosted).getTime()
      return `${Math.round(timePassed / 1000 / 60)}`
   }
   React.useEffect(() => {
      setAlertTimePassed(getTimePassed(alert.date))
   }, [])

   React.useEffect(() => {
      const interval = setInterval(() => {
         setAlertTimePassed(getTimePassed(alert.date))
      }, 60000)

      return () => {
         clearInterval(interval)
      }
   }, [alertTimePassed])


   return (
      <>
         {
            <div className={`notebook:text-5xl tablet:text-3xl mb-2 text-white flex justify-between ${getStyleByType(alert.type)} phone1:min-h-[90px] monitor1:min-h-[125px] px-2 items-center border-[6px] border-orange-500 phone1:text-2xl phone2:px-1 phone2:h-auto phone2:max-h-[125px] phone2:text-3xl hover:monitor1:min-h-[135px] group duration-200`}>
               <span className="group-hover:notebook:text-4xl group-hover:monitor1:text-6xl  duration-200 font-bold">
                  {alert.text}
               </span>
               <div className="flex items-center">
                  <span className="mr-3 text-3xl font-bold whitespace-nowrap">
                     {
                        alertTimePassed
                     }m<span className="max-[768px]:hidden"> ago</span>
                  </span>

                  <div
                     className="w-8 h-8 cursor-pointer"
                     onClick={() => {
                        socket.emit("removeAlert", alert)
                     }}
                  >
                     <Image
                        src={Cancel.src}
                        alt="censel icon"
                        sizes="100vw"
                        width={0}
                        height={0}
                        priority
                        className="w-full h-full min-w-8 min-h-8 cursor-pointer"
                     />
                  </div>
               </div>
            </div>
         }
      </>
   )
}
export default Alert