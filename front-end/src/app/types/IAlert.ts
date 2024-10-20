export interface IUsualAlert {
   text: string
   id: number
   type: IAlertType
   date: Date
   chacked: boolean
}


export interface IUrgentAlert {
   text: string
   id: string
   type: IAlertType
   date: Date
   chacked: boolean
   showed?: boolean
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