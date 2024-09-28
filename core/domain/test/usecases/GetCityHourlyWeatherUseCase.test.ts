import { HourlyWeather } from '@core/domain/src/entities/HourlyWeather';
import { WeatherState } from '@core/domain/src/entities/WeatherState';
import { GetCityHourlyWeatherRequest } from '@core/domain/src/ports/requests/GetCityHourlyWeatherRequest';
import { GetCityHourlyWeatherUseCase } from '@core/domain/src/usecases/GetCityHourlyWeatherUseCase';
import { GetHourlyWeatherPresenterBuilder } from '../builders/GetHourlyWeatherPresenterBuilder';
import { WeatherRepositoryBuilder } from '../builders/WeatherRepositoryBuilder';

describe('Get city hourly weather use case', () => {
    const hourlyWeatherInMetric: HourlyWeather[] = [
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

    const hourlyWeatherInImperial: HourlyWeather[] = [
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

    it('Should display hourly weather in metric for next hours', async () => {
        return new Promise<HourlyWeather[]>((resolve) => {
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetCityHourlyWeather((_) => Promise.resolve(hourlyWeatherInMetric))
                .build();
            const useCase = new GetCityHourlyWeatherUseCase(weatherRepository);
            const weatherRequest = new GetCityHourlyWeatherRequest('Papeete', 'C', 'km/h');
            const presenter = new GetHourlyWeatherPresenterBuilder()
                .withDisplayWeather((weather: HourlyWeather[]) => resolve(weather))
                .build();

            useCase.execute(weatherRequest, presenter);
        }).then((weather: HourlyWeather[]) => {
            expect(weather).not.toBeNull();
            expect(weather).toHaveLength(2);
            expect(weather).toEqual(hourlyWeatherInMetric);
        });
    });

    it('Should display hourly weather in imperial for next hours', async () => {
        return new Promise<HourlyWeather[]>((resolve) => {
            const weatherRepository = new WeatherRepositoryBuilder()
                .withGetCityHourlyWeather((_) => Promise.resolve(hourlyWeatherInMetric))
                .build();
            const useCase = new GetCityHourlyWeatherUseCase(weatherRepository);
            const weatherRequest = new GetCityHourlyWeatherRequest('Papeete', 'F', 'mph');
            const presenter = new GetHourlyWeatherPresenterBuilder()
                .withDisplayWeather((weather: HourlyWeather[]) => resolve(weather))
                .build();

            useCase.execute(weatherRequest, presenter);
        }).then((weather: HourlyWeather[]) => {
            expect(weather).not.toBeNull();
            expect(weather).toHaveLength(2);
            expect(weather).toEqual(hourlyWeatherInImperial);
        });
    });
});
