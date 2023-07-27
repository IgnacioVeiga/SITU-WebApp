export interface AlertElement {
    title: string;
    description: string;
    date: string;
    priority: string;
}

export interface ReportElement {
    number: number;
    date: string;
    description: string;
    photos: string;
    state: string;
}

export interface UserElement {
    dni: number;
    firstname: string;
    lastname: string;
    photo: string;
    role: string;
}