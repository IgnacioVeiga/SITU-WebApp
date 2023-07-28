import { EPriority, EReportState, ERole } from "./enums";

export class CheckListItem {
    public id: number | undefined;
    public text: string = '';
    public checked: boolean = false;
}

export class BusLine {
    public LineNumber: number = 0;
    public Routes: CheckListItem[] = [];
}

export class Alert {
    public id: number | undefined;
    public title: string = '';
    public description: string = '';
    public date: Date = new Date();
    public prority: EPriority = EPriority.Baja;
    public location: string = '';
}

export class User {
    public dni: number | undefined;
    public lastname: string = '';
    public firstname: string = '';
    public role: ERole = ERole.Otro;

    // TODO: revisar el tipado de esto
    public photo: any | undefined;
}

export class Report {
    public id: number | undefined;
    public userId: number | undefined;
    public description: string = '';
    public state: EReportState = EReportState.Espera;

    // TODO: revisar el tipado de esto
    public photos: any[] | undefined;
}