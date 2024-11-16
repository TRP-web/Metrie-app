import React from "react"
import { Socket } from "socket.io-client"
import { IAlertType, IAlertTypeOptions, IUrgentAlert, IUsualAlert } from "../types/IAlert"
import Image from "next/image"
import Bell from "../images/bell.png"
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
         <div className="mb-1">
            <div className="flex items-center phone1:flex-col phone1:items-start monitor1:flex-row monitor1:items-center">
               <div className="flex phone1:w-full monitor1:w-[70%] p-2">
                  <input
                     type="text"
                     className="border-purplecus  flex-grow border-2 rounded-[3px] mr-2 text-purplecus min-w-[250px] pl-2 h-[61px] text-xl monitor1:text-2xl"
                     value={custumMassage}
                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCustumMassage(e.target.value)
                     }}
                  />
                  <button
                     className="flex justify-center items-center bg-yellowcus text-2xl font-bold w-[150px] p-2 rounded text-white active:bg-yellowdurk"
                     onClick={sendHandler}
                  >
                     <span className="mr-2">Send</span>
                     <Image
                        src={Bell.src}
                        width={25}
                        height={25}
                        alt="bell"

                     /></button>
               </div>
               <div className="flex flex-grow">
                  <label htmlFor="" className="mb-1 block mr-3 cursor-pointer text-xl text-red-600 font-bold" onClick={() => setAlertType(IAlertTypeOptions.urgent)}>
                     <input
                        type="radio"
                        name="alert-type"
                        className="mr-1 h-4 w-4 cursor-pointer"
                        checked={alertType === IAlertTypeOptions.urgent ? true : false}
                        readOnly
                     />
                     Urgent
                  </label>
                  <label htmlFor="" className="mb-1 block mr-3 cursor-pointer text-xl text-yellowcus font-bold" onClick={() => setAlertType(IAlertTypeOptions.normal)}>
                     <input
                        type="radio"
                        name="alert-type"
                        className="mr-1 h-4 w-4 cursor-pointer"
                        checked={alertType === IAlertTypeOptions.normal ? true : false}
                        readOnly
                     />
                     Normal
                  </label>
                  <label htmlFor="" className="block cursor-pointer text-xl text-gray-600 font-bold" onClick={() => setAlertType(IAlertTypeOptions.keepGoing)}>
                     <input
                        type="radio"
                        name="alert-type"
                        className="mr-1 h-4 w-4 cursor-pointer"
                        checked={alertType === IAlertTypeOptions.keepGoing ? true : false}
                        readOnly
                     />
                     Keep going
                  </label>
               </div>
            </div>

         </div>
      </>
   )
}
export default AlertsSender