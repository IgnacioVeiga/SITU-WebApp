import { EPriority, EReportState, ERole } from "./enums";

export class CheckListItem {
    public id: number | undefined;
    public text: string = '';
    public checked: boolean = false;
}

export class BusLineModel {
    public LineNumber: number = 0;
    public Routes: CheckListItem[] = [];
}