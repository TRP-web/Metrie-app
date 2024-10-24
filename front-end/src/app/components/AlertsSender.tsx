import { title } from "process"
import React from "react"
import { Socket } from "socket.io-client"
import { IAlert, IAlertType, IAlertTypeOptions, IAnyAlertList, IUrgentAlert, IUsualAlert } from "../types/IAlert"
interface IAlertsSenderProps {
   socket: Socket
   title: React.ReactNode
}
const AlertsSender: React.FC<IAlertsSenderProps> = ({ socket, title }) => {
   const [custumMassage, setCustumMassage] = React.useState<string>("test222")
   const [alertType, setAlertType] = React.useState<IAlertType>(IAlertTypeOptions.normal)
   const sendHandler = () => {
      const date: Date = new Date()
      let newAlert: IUrgentAlert | IUsualAlert
      if (alertType === IAlertTypeOptions.urgent) {
         newAlert = {
            text: custumMassage,
            id: crypto.randomUUID(),
            type: alertType,
            date: date,
            checked: false,
            shown: false
         }
      } else {
         newAlert = {
            text: custumMassage,
            id: crypto.randomUUID(),
            type: alertType,
            date: date,
            checked: false,
         }
      }
      socket.emit("alert", newAlert)


   }



   return (
      <>
         <div className="mb-5">
            {title}
            <div className="block ">
               <label htmlFor="" className="mb-1 block" onClick={() => setAlertType(IAlertTypeOptions.urgent)}>
                  <input
                     type="radio"
                     name="alert-type"
                     className="p-1"
                     checked={alertType === IAlertTypeOptions.urgent ? true : false}
                     readOnly
                  />
                  Urgent
               </label>
               <label htmlFor="" className="mb-1 block" onClick={() => setAlertType(IAlertTypeOptions.normal)}>
                  <input
                     type="radio"
                     name="alert-type"
                     className="p-1"
                     checked={alertType === IAlertTypeOptions.normal ? true : false}
                     readOnly
                  />
                  Normal
               </label>
               <label htmlFor="" className="block" onClick={() => setAlertType(IAlertTypeOptions.keepGoing)}>
                  <input
                     type="radio"
                     name="alert-type"
                     className="p-1"
                     checked={alertType === IAlertTypeOptions.keepGoing ? true : false}
                     readOnly
                  />
                  Keep going
               </label>
            </div>
            <div className="flex p-4">
               <input
                  type="text"
                  className="border-purplecus border-2 mr-2 text-purplecus min-w-[250px] pl-1"
                  value={custumMassage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                     setCustumMassage(e.target.value)
                  }}
               />
               <button
                  className="bg-yellowcus p-2 rounded text-white"
                  onClick={sendHandler}
               >Send</button>
            </div>
         </div>
      </>
   )
}
export default AlertsSender