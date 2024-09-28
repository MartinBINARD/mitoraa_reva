import { DailyWeather } from '../../entities/DailyWeather';

export interface GetDailyWeatherPresenter {
    displayLoadingWeather(): void;
    displayDailyWeather(weather: DailyWeather[]): void;
}
