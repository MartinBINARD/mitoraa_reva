import { Location } from './Location';

export interface City {
    name: string;
    coord: Location;
    country: string;
    population: number;
    sunrise: number;
    sunset: number;
}
