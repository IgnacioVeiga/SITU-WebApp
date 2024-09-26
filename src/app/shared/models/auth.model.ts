import { UserRole } from "./user.model"

export interface SignUpForm {
    companyName: string,
    email: string,  
    phone: string | undefined,
    firstName: string,
    lastName: string,
    dni: number | undefined,
    note: string | undefined
}

export interface LogInForm {
    email: string,
    password: string,
    rememberMe: boolean // may be unnecesary
}

export interface ChangePasswordDTO {
    currentPassword: string,
    newPassword: string
}

export interface SessionDTO {
    userId: number, // may be unnecesary
    companyId: number,
    logoImageURL: string,
    email: string,
    fullName: string,
    role: UserRole
}