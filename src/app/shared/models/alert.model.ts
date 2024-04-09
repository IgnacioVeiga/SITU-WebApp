import { User } from "./user.model";

export class Alert {
    public id: number = 0;
    public user: User = new User();
    public title: string = '';
    public description: string = '';
    public alertDate: Date = new Date();
    public alertPriority: AlertPriority = AlertPriority.HIGH;
    public location: string = '';
}

export enum AlertPriority {
    HIGH = "Alta",
    MEDIUM = "Media",
    LOW = "Baja"
}