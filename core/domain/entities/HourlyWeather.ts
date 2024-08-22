import { UniteDegree } from './UniteDegree';
import { WeatherState } from './WeatherState';
import { Wind } from './Wind';

export interface HourlyWeather {
    type: 'hourly';
    time: string;
    temperature: number;
    weather: WeatherState;
    unite: UniteDegree;
    humidity: number;
    wind: Wind;
}
