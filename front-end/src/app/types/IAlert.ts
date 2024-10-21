export interface IUsualAlert {
   text: string
   id: number
   type: IAlertTypeOptions.keepGoing | IAlertTypeOptions.normal
   date: Date
   checked: boolean
   
}


export interface IUrgentAlert {
   text: string
   id: string
   type: IAlertTypeOptions.urgent
   date: Date
   checked: boolean
   shown: boolean
}

export type IAlertType =
   IAlertTypeOptions.keepGoing |
   IAlertTypeOptions.normal |
   IAlertTypeOptions.urgent

export enum IAlertTypeOptions {
   keepGoing = "keep-going",
   normal = "normal",
   urgent = "urgent"
}

export type IAlert<T extends IAlertType> =
   T extends IAlertTypeOptions.urgent ? IUrgentAlert
   : IUsualAlert

export type IAnyAlertList = IAlert<IAlertTypeOptions.urgent>[] | IAlert<IAlertTypeOptions.normal>[]