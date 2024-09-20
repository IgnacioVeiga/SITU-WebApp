export interface BusLine {
    id: number;
    name: string;
    company: {
        id: number;
        name: string;
        logo_filename: string;
    };
    number: string;
    selected?: boolean;
}
