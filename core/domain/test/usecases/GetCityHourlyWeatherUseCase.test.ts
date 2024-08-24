import { HourlyWeather } from '@core/domain/src/entities/HourlyWeather';
import { WeatherState } from '@core/domain/src/entities/WeatherState';
import { GetHourlyWeatherRequest } from '@core/domain/src/ports/requests/GetHourlyWeatherRequest';
import { GetCityHourlyWeatherUseCase } from '@core/domain/src/usecases/GetCityHourlyWeatherUseCase';
import { GetHourlyWeatherPresenterBuilder } from '../builders/GetHourlyWeatherPresenterBuilder';
import { WeatherRepositoryBuilder } from '../builders/WeatherRepositoryBuilder';

describe('Get city hourly weather use case', () => {
    const weatherDataMetric: HourlyWeather[] = [
        {
            type: 'hourly',
            time: '7:00',
            temperature: 25,
            weather: WeatherState.clear_sky,
            unit: 'C',
            humidity: 90,
            wind: { speed: 5, direction: 50, unit: 'km/s' },
        },
        {
            type: 'hourly',
            time: '8:00',
            temperature: 27,
            weather: WeatherState.clear_sky,
            unit: 'C',
            humidity: 90,
            wind: { speed: 7.2, direction: 50, unit: 'km/s' },
        },
        {
            type: 'hourly',
            time: '9:00',
            temperature: 29,
            weather: WeatherState.clear_sky,
            unit: 'C',
            humidity: 90,
            wind: { speed: 7.5, direction: 55, unit: 'km/s' },
        },
    ];

    it('Should display hourly weather in C° for next hours', async () => {
        return new Promise<HourlyWeather[]>((resolve) => {
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetCityHourlyWeather((_) => Promise.resolve(weatherDataMetric))
                .build();
            const useCase = new GetCityHourlyWeatherUseCase(weatherRepository);
            const weatherRequest = new GetHourlyWeatherRequest('Papeete', 'C', 'km/s');
            const presenter = new GetHourlyWeatherPresenterBuilder()
                .withDisplayWeather((weather: HourlyWeather[]) => resolve(weather))
                .build();

            useCase.execute(weatherRequest, presenter);
        }).then((weather: HourlyWeather[]) => {
            expect(weather).not.toBeNull();
            expect(weather).toHaveLength(3);
            expect(weather).toBe(weatherDataMetric);
        });
    });
});
