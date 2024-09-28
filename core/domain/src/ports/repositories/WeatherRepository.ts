import { DailyWeather } from '../../entities/DailyWeather';
import { HourlyWeather } from '../../entities/HourlyWeather';
import { Location } from '../../entities/Location';

export interface WeatherRepository {
    getCityDailyWeather(city: string): Promise<DailyWeather[]>;
    getCityHourlyWeather(city: string): Promise<HourlyWeather[]>;
    getLocalHourlyWeather(location: Location): Promise<HourlyWeather[]>;
}
