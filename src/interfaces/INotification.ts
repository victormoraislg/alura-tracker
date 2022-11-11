export enum NotificationType {
  SUCCESS,
  ERROR,
  WARNING,
}

export interface INotification {
  title: string,
  text: string,
  type: NotificationType,
  id: number
}