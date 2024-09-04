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
            unitTemperature: 'C',
            humidity: 90,
            wind: { speed: 5, direction: 50, unitSpeed: 'km/h' },
        },
        {
            type: 'hourly',
            time: '8:00',
            temperature: 27,
            weather: WeatherState.clear_sky,
            unitTemperature: 'C',
            humidity: 90,
            wind: { speed: 7.2, direction: 50, unitSpeed: 'km/h' },
        },
        {
            type: 'hourly',
            time: '9:00',
            temperature: 29,
            weather: WeatherState.clear_sky,
            unitTemperature: 'C',
            humidity: 90,
            wind: { speed: 7.5, direction: 55, unitSpeed: 'km/h' },
        },
    ];

    const weatherDataImperial: HourlyWeather[] = [
        {
            type: 'hourly',
            time: '7:00',
            temperature: 77,
            weather: WeatherState.clear_sky,
            unitTemperature: 'F',
            humidity: 90,
            wind: { speed: 3.1, direction: 50, unitSpeed: 'mph' },
        },
        {
            type: 'hourly',
            time: '8:00',
            temperature: 80.6,
            weather: WeatherState.clear_sky,
            unitTemperature: 'F',
            humidity: 90,
            wind: { speed: 4.5, direction: 50, unitSpeed: 'mph' },
        },
        {
            type: 'hourly',
            time: '9:00',
            temperature: 84.2,
            weather: WeatherState.clear_sky,
            unitTemperature: 'F',
            humidity: 90,
            wind: { speed: 4.7, direction: 55, unitSpeed: 'mph' },
        },
    ];

    it('Should display local hourly weather in metric for next hours', async () => {
        return new Promise<HourlyWeather[]>((resolve) => {
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetLocalHourlyWeather((_) => Promise.resolve(weatherDataMetric))
                .build();
            const useCase = new GetLocalHourlyWeatherUseCase(weatherRepository);
            const weatherRequest = new GetLocalHourlyWeatherRequest(
                { latitude: -17.539247972095957, longitude: -149.56692494903635 },
                'C',
                'km/h',
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

    it('Should display local hourly weather in imperial for next hours ', async () => {
        return new Promise<HourlyWeather[]>((resolve) => {
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetLocalHourlyWeather((_) => Promise.resolve(weatherDataMetric))
                .build();
            const useCase = new GetLocalHourlyWeatherUseCase(weatherRepository);
            const weatherRequest = new GetLocalHourlyWeatherRequest(
                { latitude: -17.539247972095957, longitude: -149.56692494903635 },
                'F',
                'mph',
            );
            const presenter = new GetHourlyWeatherPresenterBuilder()
                .withDisplayWeather((weather: HourlyWeather[]) => resolve(weather))
                .build();

            useCase.execute(weatherRequest, presenter);
        }).then((weather: HourlyWeather[]) => {
            expect(weather).not.toBeNull();
            expect(weather).toHaveLength(3);
            expect(weather).toEqual(weatherDataImperial);
        });
    });
});
