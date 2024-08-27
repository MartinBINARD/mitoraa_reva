import { HourlyWeather } from '@core/domain/src/entities/HourlyWeather';
import { WeatherState } from '@core/domain/src/entities/WeatherState';
import { GetLocalHourlyWeatherRequest } from '@core/domain/src/ports/requests/GetLocalHourlyRequest';
import { GetLocalHourlyWeatherUseCase } from '@core/domain/src/usecases/GetLocalHourlyWeatherUseCase';
import { GetHourlyWeatherPresenterBuilder } from '../builders/GetHourlyWeatherPresenterBuilder';
import { WeatherRepositoryBuilder } from '../builders/WeatherRepositoryBuilder';

describe('Get local hourly weather use case', () => {
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

    it('Should display hourly weather in metric for next hours', async () => {
        return new Promise<HourlyWeather[]>((resolve) => {
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetLocalHourlyWeather((_) => Promise.resolve(weatherDataMetric))
                .build();
            const useCase = new GetLocalHourlyWeatherUseCase(weatherRepository);
            const weatherRequest = new GetLocalHourlyWeatherRequest(
                { latitude: -17.539247972095957, longitude: -149.56692494903635 },
                'C',
                'km/s',
            );
            const presenter = new GetHourlyWeatherPresenterBuilder()
                .withDisplayWeather((weather: HourlyWeather[]) => resolve(weather))
                .build();

            useCase.execute(weatherRequest, presenter);
        }).then((weather: HourlyWeather[]) => {
            expect(weather).not.toBeNull();
            expect(weather).toHaveLength(3);
            expect(weather).toEqual(weatherDataMetric);
        });
    });
});
