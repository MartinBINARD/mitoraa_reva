import { HourlyWeather } from '../../entities/HourlyWeather';

export interface GetHourlyWeatherPresenter {
    displayLoadingWeather(): void;
    displayHourlyWeather(weather: HourlyWeather[]): void;
}
