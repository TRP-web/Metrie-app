import React from "react"
import AlertPreset from "./AlertPreset"
import fishEyes from "./fish_eyes.jpg"
import { primeSocket } from "@/socket"
import { HeaderContext, IHeaderContext } from "../HeaderProvider/HeaderProvider"

const AlertPresetsOutfeed: React.FC = () => {
   const { image } = React.useContext(HeaderContext) as IHeaderContext
   return (
      <>
         <div className="flex pl-2 overflow-x-scroll no-scrollbar">
            <AlertPreset src={image ? image : fishEyes.src} socket={primeSocket}>
               Outfeed line Down!!!
            </AlertPreset>
            <AlertPreset src={image ? image : fishEyes.src} socket={primeSocket}>
               {/* {Fouldown:} */}
               Paint Splash!
            </AlertPreset>
            <AlertPreset src={image ? image : fishEyes.src} socket={primeSocket}>
               Paint missing!
            </AlertPreset>
            <AlertPreset src={image ? image : fishEyes.src} socket={primeSocket}>
               Line on the side!
            </AlertPreset>
            <AlertPreset src={image ? image : fishEyes.src} socket={primeSocket}>
               Line on the nose!
            </AlertPreset>
            <AlertPreset src={image ? image : fishEyes.src} socket={primeSocket}>
               Cracking!
            </AlertPreset>
            <AlertPreset src={image ? image : fishEyes.src} socket={primeSocket}>
               Marks!
            </AlertPreset>
            <AlertPreset src={image ? image : fishEyes.src} socket={primeSocket}>
               Rough finish on the side!
            </AlertPreset>
            <AlertPreset src={image ? image : fishEyes.src} socket={primeSocket}>
               Damage!
            </AlertPreset>
         </div>
      </>
   )
}
export default AlertPresetsOutfeed