import { Company } from "./company.model";
import { Image } from "./image.model";

export class User {
    id: number = 0;
    company: Company = new Company();
    profileImage: Image = new Image();
    dni: number = 0;
    firstName: string = '';
    lastName: string = '';
    role: UserRole = UserRole.OTHER;
}

export enum UserRole {
    ADMIN = "Administrador",
    DRIVER = "Chofer",
    OTHER = "Otro"
}