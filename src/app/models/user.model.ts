import { ERole } from "./enums";

export class UserModel {
    // Para la base de datos
    public id!: number;

    public dni!: number;
    public lastname: string = 'Natalia';
    public firstname: string = 'Natalia';
    public role: ERole = ERole.Other;
    public photoURL: string = './assets/images/perfil.png';

    // TODO: SEPARAR, solo disponible para el usuario logeado
    public email: string = '';
    public password: string = '';
}