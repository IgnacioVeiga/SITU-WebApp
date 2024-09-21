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

export interface BusRoute {
    id: number;
    name: string;
    coordinates: any;
    lineId?: number;
    selected?: boolean;
}

export interface BusStop {
    id: number;
    name: string;
    location: any;
}
