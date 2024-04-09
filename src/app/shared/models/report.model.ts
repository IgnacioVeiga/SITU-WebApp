import { Image } from "./image.model";
import { User } from "./user.model";

export class Report {
    public id: number = 0;
    public user: User = new User();
    public reportImage: Image = new Image();
    public description: string = '';
    public reportDate: Date = new Date();
    public reason: string = '';
    public state: ReportState = ReportState.WORKING_ON_IT;
}

export enum ReportState {
    WAITING = "En espera",
    WORKING_ON_IT = "En revisión",
    RESOLVED = "Resuelta"
}