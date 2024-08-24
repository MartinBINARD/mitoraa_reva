import { DailyWeather } from '@core/domain/src/entities/DailyWeather';
import { WeatherState } from '@core/domain/src/entities/WeatherState';
import { GetCityDailyWeatherUseCase } from '@core/domain/src/usecases/GetCityDailyWeatherUseCase';
import { GetDailyWeatherPresenterBuilder } from '../builders/GetDailyWeatherPresenterBuilder';
import { WeatherRepositoryBuilder } from '../builders/WeatherRepositoryBuilder';
import { GetDailyWeatherRequest } from '@core/domain/src/ports/requests/GetDailyWeatherRequest';

describe('Get city daily weather use case', () => {
    const weatherDataInCelsius: DailyWeather[] = [
        {
            type: 'daily',
            day: '22/08/2021',
            temperatureMin: 22,
            temperatureMax: 27,
            weather: WeatherState.clear_sky,
            unite: 'C',
            sunrise: '6:12',
            sunset: '17:51',
        },
        {
            type: 'daily',
            day: '23/08/2021',
            temperatureMin: 23,
            temperatureMax: 28,
            weather: WeatherState.few_clouds,
            unite: 'C',
            sunrise: '6:12',
            sunset: '17:51',
        },
    ];

    const weatherDataInFahrenheit: DailyWeather[] = [
        {
            type: 'daily',
            day: '22/08/2021',
            temperatureMin: 71.6,
            temperatureMax: 80.6,
            weather: WeatherState.clear_sky,
            unite: 'F',
            sunrise: '6:12',
            sunset: '17:51',
        },
        {
            type: 'daily',
            day: '23/08/2021',
            temperatureMin: 73.4,
            temperatureMax: 82.4,
            weather: WeatherState.few_clouds,
            unite: 'F',
            sunrise: '6:12',
            sunset: '17:51',
        },
    ];

    it('Should display daily weather in C° for next days', async () => {
        return new Promise<DailyWeather[]>((resolve) => {
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetCityWeekWeather((_) => Promise.resolve(weatherDataInCelsius))
                .build();
            const useCase = new GetCityDailyWeatherUseCase(weatherRepository);
            const weatherRequest = new GetDailyWeatherRequest('Papeete', 'C');

            const presenter = new GetDailyWeatherPresenterBuilder()
                .withDisplayWeather((weather: DailyWeather[]) => resolve(weather))
                .build();

            useCase.execute(weatherRequest, presenter);
        }).then((weather: DailyWeather[]) => {
            expect(weather).not.toBeNull();
            expect(weather).toHaveLength(2);
            expect(weather).toEqual(weatherDataInCelsius);
        });
    });

    it('Should display daily weather in F° for next days', async () => {
        return new Promise<DailyWeather[]>((resolve) => {
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetCityWeekWeather((_) => Promise.resolve(weatherDataInCelsius))
                .build();
            const useCase = new GetCityDailyWeatherUseCase(weatherRepository);
            const weatherRequest = new GetDailyWeatherRequest('Papeete', 'F');

            const presenter = new GetDailyWeatherPresenterBuilder()
                .withDisplayWeather((weather: DailyWeather[]) => resolve(weather))
                .build();

            useCase.execute(weatherRequest, presenter);
        }).then((weather: DailyWeather[]) => {
            expect(weather).not.toBeNull();
            expect(weather).toHaveLength(2);
            expect(weather).toEqual(weatherDataInFahrenheit);
        });
    });
});
