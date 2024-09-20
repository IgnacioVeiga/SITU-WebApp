export interface BusLine {
    id: number;
    number: string;
    name: string;
    company: {
        id: number;
        name: string;
        logo_filename: string;
    };
    selected?: boolean;
}
