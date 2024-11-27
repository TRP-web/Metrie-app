"use client"

import React from "react"
export interface IHeaderContext {
   image: string | null
   setImage: (newPhoto: string | null) => void
}

export const HeaderContext = React.createContext<IHeaderContext | null>(null)

const HeaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [image, setImage] = React.useState<string | null>(null)
   return (
      <HeaderContext.Provider value={{
         image,
         setImage
      }}>
         {children}
      </HeaderContext.Provider>
   )
}
export default HeaderProvider