import { UnitDegree } from './UnitDegree';
import { WeatherState } from './WeatherState';

export interface DailyWeather {
    type: 'daily';
    day: string;
    weather: WeatherState;
    temperatureMax: number;
    temperatureMin: number;
    unit: UnitDegree;
    sunrise: string;
    sunset: string;
}
