import { Wind } from './Wind';

export interface Weather {
    dt_txt: string;
    temp: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
    description: string;
    wind: Wind;
}
