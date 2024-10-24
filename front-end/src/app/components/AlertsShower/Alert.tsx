import { IAlertType, IAlertTypeOptions, IUrgentAlert, IUsualAlert } from "@/app/types/IAlert"
import React from "react"
import { Socket } from "socket.io-client"

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
      return `${Math.round(timePassed / 1000 / 60)} min ago`
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
            <div className={`p-5 text-5xl mb-2 text-white flex justify-between ${getStyleByType(alert.type)}`}>
               <span>
                  {alert.text}
               </span>
               <div className="flex items-center">
                  <span className="mr-3">
                     {
                        alertTimePassed
                     }
                  </span>
                  <div
                     className="w-8 h-8 bg-white cursor-pointer"
                     onClick={() => {
                        socket.emit("removeAlert", alert)
                     }}
                  ></div>
               </div>
            </div>
         }
      </>
   )
}
export default Alert