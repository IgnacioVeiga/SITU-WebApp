export class BusLineModel {
    public id!: number;
    public lineNumber: number = 0;
    public routes: string[] = [];
}

export interface Line {
    number: number;
    selected: boolean;
}

export interface Route {
    name: string;
    line: number;
    selected: boolean;
}