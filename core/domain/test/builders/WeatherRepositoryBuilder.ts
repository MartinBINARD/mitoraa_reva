import { DailyWeather } from '@core/domain/src/entities/DailyWeather';
import { HourlyWeather } from '@core/domain/src/entities/HourlyWeather';
import { WeatherRepository } from '@core/domain/src/ports/repositories/WeatherRepository';

export class WeatherRepositoryBuilder {
    private getCityDailyWeather: (city: string) => Promise<DailyWeather[]> = () => Promise.resolve([]);
    private getCityHourlyWeather: (city: string) => Promise<HourlyWeather[]> = () => Promise.resolve([]);

    withGetCityWeekWeather(getCityWeekWeather: (city: string) => Promise<DailyWeather[]>) {
        this.getCityDailyWeather = getCityWeekWeather;
        return this;
    }

    withGetCityHourlyWeather(getCityHourlyWeather: (_: any) => Promise<HourlyWeather[]>) {
        this.getCityHourlyWeather = getCityHourlyWeather;
        return this;
    }

    build(): WeatherRepository {
        return {
            getCityDailyWeather: this.getCityDailyWeather,
            getCityHourlyWeather: this.getCityHourlyWeather,
        };
    }
}
