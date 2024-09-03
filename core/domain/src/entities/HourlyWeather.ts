import { unitTemperature } from './UnitTemperature';
import { WeatherState } from './WeatherState';
import { Wind } from './Wind';

export interface HourlyWeather {
    type: 'hourly';
    time: string;
    temperature: number;
    weather: WeatherState;
    unitTemperature: unitTemperature;
    humidity: number;
    wind: Wind;
}
