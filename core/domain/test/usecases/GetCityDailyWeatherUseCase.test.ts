import { DailyWeather } from '@core/domain/src/entities/DailyWeather';
import { WeatherState } from '@core/domain/src/entities/WeatherState';
import { GetDailyWeatherRequest } from '@core/domain/src/ports/requests/GetWeatherRequest';
import { GetDailyWeatherPresenterBuilder } from '../builders/GetDailyWeatherPresenterBuilder';
import { WeatherRepositoryBuilder } from '../builders/WeatherRepositoryBuilder';
import { GetCityDailyWeatherUseCase } from '@core/domain/src/usecases/GetCityDailyWeatherUseCase';

describe('Get city daily weather use case', () => {
    it('Should display daily weather in °C for next days', async () => {
        const weatherData: DailyWeather[] = [
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

        return new Promise<DailyWeather[]>((resolve) => {
            const weatherRepository = new WeatherRepositoryBuilder().withGetCityWeekWeathe((_) => Promise.resolve(weatherData)).build();
            const useCase = new GetCityDailyWeatherUseCase(weatherRepository);
            const weatherRequest = new GetDailyWeatherRequest('Papeete', 'C');

            const presenter = new GetDailyWeatherPresenterBuilder()
                .withDisplayWeather((weather: DailyWeather[]) => resolve(weather))
                .build();

            useCase.execute(weatherRequest, presenter);
        }).then((weather: DailyWeather[]) => {
            expect(weather).not.toBeNull();
            expect(weather).toHaveLength(2);
            expect(weather).toEqual(weatherData);
        });
    });
});
