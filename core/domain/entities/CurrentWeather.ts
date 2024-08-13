import { Wind } from './Wind';

export interface CurrentWeather {
    temp: number;
    feels_like: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
    description: string;
    wind: Wind;
}
