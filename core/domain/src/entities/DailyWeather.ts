import { UnitDegree } from './UnitTemperature';
import { WeatherState } from './WeatherState';

export interface DailyWeather {
    type: 'daily';
    day: string;
    weather: WeatherState;
    temperatureMax: number;
    temperatureMin: number;
    unitTemperature: UnitDegree;
    sunrise: string;
    sunset: string;
}
