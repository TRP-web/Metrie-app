import React from "react"
import AlertPreset from "./AlertPreset"
import fishEyes from "./fish_eyes.jpg"
import { primeSocket } from "@/socket"

const AlertPresetsOutfeed: React.FC = () => {

   return (
      <>
         <div className="flex pl-2 overflow-x-scroll no-scrollbar">
            <AlertPreset src={fishEyes.src} socket={primeSocket}>
               Outfeed line Down!!!
            </AlertPreset>
            <AlertPreset src={fishEyes.src} socket={primeSocket}>
               Fouldown: Paint Splash!!!
            </AlertPreset>
            <AlertPreset src={fishEyes.src} socket={primeSocket}>
               Fouldown: Paint missing
            </AlertPreset>
         </div>
      </>
   )
}
export default AlertPresetsOutfeed