import { HourlyWeather } from '../../entities/HourlyWeather';

export interface GetHourlyWeatherPresenter {
    displayLoadingWeather(): void;
    displayDailyWeather(weather: HourlyWeather[]): void;
}
