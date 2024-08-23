import { DailyWeather } from '@core/domain/src/entities/DailyWeather';
import { WeatherRespository } from '@core/domain/src/ports/repositories/WeatherRepository';

export class WeatherRepositoryBuilder {
    private getCityDailyWeather: (city: string) => Promise<DailyWeather[]> = () => Promise.resolve([]);

    withGetCityWeekWeathe(getCityWeekWeather: (city: string) => Promise<DailyWeather[]>) {
        this.getCityDailyWeather = getCityWeekWeather;
        return this;
    }

    build(): WeatherRespository {
        return {
            getCityDailyWeather: this.getCityDailyWeather,
        };
    }
}
