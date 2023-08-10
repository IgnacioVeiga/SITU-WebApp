export class ReportModel {
    public id!: number;
    public userId!: number;
    public description: string = '';
    public date: Date = new Date();
    public reason: string = '';
    public state: EReportState = EReportState.Standby;
    public photoURLs: string[] = [];
}

export enum EReportState {
    Standby = "En espera",
    Resolved = "Resuelta"
}