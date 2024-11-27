

export interface IAlertPattern<T> {
   text: string
   id: string
   type: T
   date: Date
   checked: boolean
}


export type IUsualAlert = IAlertPattern<IAlertTypeOptions.normal | IAlertTypeOptions.keepGoing>

export interface IUrgentAlert extends IAlertPattern<IAlertTypeOptions.urgent> {
   shown: boolean
   src?: string
}

export type IAnyAlert = IUrgentAlert | IUsualAlert

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