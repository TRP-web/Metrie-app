import React from "react"
import AlertPreset from "./AlertPreset"
import fishEyes from "./fish_eyes.jpg"
import { outfeedSocket, primeSocket } from "@/socket"

const AlertPresetsPrime: React.FC = () => {

   return (
      <>
         <div className="flex pl-2 overflow-x-scroll no-scrollbar">
            <AlertPreset socket={outfeedSocket} src={fishEyes.src}>
               Fouldown boards are coming
            </AlertPreset>
         </div>
      </>
   )
}
export default AlertPresetsPrime