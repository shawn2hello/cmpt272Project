export interface PigReport{
    pid: number;
    name: string;
    phone: string;
    breed: string;
    location: string;
    status: string;
    day: string;
    notes?: string;
    long: number;
    lat: number;
    id?: string;
    enterLocation: boolean;
}


/**
 * pid
 * name
 * phone
 * breed
 * location
 * - long
 * - lat
 * notes?
 * status
 * day
 */