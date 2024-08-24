import { DailyWeather } from '../../entities/DailyWeather';

export interface WeatherRepository {
    getCityDailyWeather(city: string): Promise<DailyWeather[]>;
}
