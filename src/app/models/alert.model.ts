import { EPriority } from "./enums";

export class AlertModel {
    // Para la base de datos
    public id!: number;

    public title: string = '';
    public description: string = '';
    public date: Date = new Date();
    public priority: EPriority = EPriority.Low;
    public location: string = '';
}