import { UnitDegree } from './UnitDegree';
import { WeatherState } from './WeatherState';
import { Wind } from './Wind';

export interface HourlyWeather {
    type: 'hourly';
    time: string;
    temperature: number;
    weather: WeatherState;
    unit: UnitDegree;
    humidity: number;
    wind: Wind;
}
