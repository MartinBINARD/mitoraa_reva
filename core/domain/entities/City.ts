import { Location } from './Location';

export interface City {
    name: string;
    coord: Location;
    sunrise: number;
    sunset: number;
}
