export class AlertModel {
    // Para la base de datos
    public id!: number;
    public userId!: number;

    public title: string = '';
    public description: string = '';
    public date: Date = new Date();
    public priority: EPriority = EPriority.Low;
    public location: string = '';
}

export enum EPriority {
    Low = "Baja",
    Mid = "Media",
    High = "Alta"
}