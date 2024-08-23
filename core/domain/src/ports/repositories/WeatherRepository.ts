import { DailyWeather } from '../../entities/DailyWeather';

export interface WeatherRespository {
    getCityDailyWeather(city: string): Promise<DailyWeather[]>;
}
