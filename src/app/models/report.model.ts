import { EReportState } from "./enums";

export class ReportModel {
    public id: number | undefined;
    public userId: number | undefined;
    public description: string = '';
    public date: Date = new Date();
    public state: EReportState = EReportState.Standby;

    // TODO: revisar el tipado de esto
    public photos: any[] | undefined;
}