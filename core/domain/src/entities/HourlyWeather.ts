import { UnitTemperature } from './UnitTemperature';
import { WeatherState } from './WeatherState';
import { Wind } from './Wind';

export interface HourlyWeather {
    type: 'hourly';
    time: string;
    temperature: number;
    weather: WeatherState;
    unitTemperature: UnitTemperature;
    humidity: number;
    wind: Wind;
}
