import { DailyWeather } from '@core/domain/src/entities/DailyWeather';
import { WeatherState } from '@core/domain/src/entities/WeatherState';
import { GetCityDailyWeatherRequest } from '@core/domain/src/ports/requests/GetCityDailyWeatherRequest';
import { GetCityDailyWeatherUseCase } from '@core/domain/src/usecases/GetCityDailyWeatherUseCase';
import { GetDailyWeatherPresenterBuilder } from '../builders/GetDailyWeatherPresenterBuilder';
import { WeatherRepositoryBuilder } from '../builders/WeatherRepositoryBuilder';

describe('Get city daily weather use case', () => {
    const weatherDataInMetric: DailyWeather[] = [
        {
            type: 'daily',
            day: '22/08/2021',
            temperatureMin: 22,
            temperatureMax: 27,
            weather: WeatherState.clear_sky,
            unitTemperature: 'C',
            sunrise: '6:12',
            sunset: '17:51',
        },
        {
            type: 'daily',
            day: '23/08/2021',
            temperatureMin: 23,
            temperatureMax: 28,
            weather: WeatherState.few_clouds,
            unitTemperature: 'C',
            sunrise: '6:12',
            sunset: '17:51',
        },
    ];

    const weatherDataInImperial: DailyWeather[] = [
        {
            type: 'daily',
            day: '22/08/2021',
            temperatureMin: 71.6,
            temperatureMax: 80.6,
            weather: WeatherState.clear_sky,
            unitTemperature: 'F',
            sunrise: '6:12',
            sunset: '17:51',
        },
        {
            type: 'daily',
            day: '23/08/2021',
            temperatureMin: 73.4,
            temperatureMax: 82.4,
            weather: WeatherState.few_clouds,
            unitTemperature: 'F',
            sunrise: '6:12',
            sunset: '17:51',
        },
    ];

    it('Should display daily weather in C° for next days', async () => {
        return new Promise<DailyWeather[]>((resolve) => {
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetCityWeekWeather((_) => Promise.resolve(weatherDataInMetric))
                .build();
            const useCase = new GetCityDailyWeatherUseCase(weatherRepository);
            const weatherRequest = new GetCityDailyWeatherRequest('Papeete', 'C');

            const presenter = new GetDailyWeatherPresenterBuilder()
                .withDisplayWeather((weather: DailyWeather[]) => resolve(weather))
                .build();

            useCase.execute(weatherRequest, presenter);
        }).then((weather: DailyWeather[]) => {
            expect(weather).not.toBeNull();
            expect(weather).toHaveLength(2);
            expect(weather).toEqual(weatherDataInMetric);
        });
    });

    it('Should display daily weather in F° for next days', async () => {
        return new Promise<DailyWeather[]>((resolve) => {
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetCityWeekWeather((_) => Promise.resolve(weatherDataInMetric))
                .build();
            const useCase = new GetCityDailyWeatherUseCase(weatherRepository);
            const weatherRequest = new GetCityDailyWeatherRequest('Papeete', 'F');

            const presenter = new GetDailyWeatherPresenterBuilder()
                .withDisplayWeather((weather: DailyWeather[]) => resolve(weather))
                .build();

            useCase.execute(weatherRequest, presenter);
        }).then((weather: DailyWeather[]) => {
            expect(weather).not.toBeNull();
            expect(weather).toHaveLength(2);
            expect(weather).toEqual(weatherDataInImperial);
        });
    });
});
