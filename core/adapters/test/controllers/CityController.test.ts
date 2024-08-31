import { DailyWeather } from '@core/domain/src/entities/DailyWeather';
import { WeatherState } from '@core/domain/src/entities/WeatherState';
import { GetDailyWeatherPresenter } from '@core/domain/src/ports/presenters/GetDailyWeatherPresenter';
import { GetCityDailyWeatherRequest } from '@core/domain/src/ports/requests/GetCityDailyWeatherRequest';
import { GetCityDailyWeatherUseCaseBuilder } from '../builders/GetCityDailyWeatherUseCaseBuilder';
import { GetCityHourlyWeatherUseCaseBuilder } from '../builders/GetCityHourlyWeatherUseCaseBuilder';

describe('City Controller', () => {
    it('Should display city daily weather : update daily weather vm', async () => {
        const dailyWeatherInCelsius: DailyWeather[] = [
            {
                type: 'daily',
                day: '22/08/2021',
                temperatureMin: 22,
                temperatureMax: 27,
                weather: WeatherState.clear_sky,
                unit: 'C',
                sunrise: '6:12',
                sunset: '17:51',
            },
            {
                type: 'daily',
                day: '23/08/2021',
                temperatureMin: 23,
                temperatureMax: 28,
                weather: WeatherState.few_clouds,
                unit: 'C',
                sunrise: '6:12',
                sunset: '17:51',
            },
        ];
        const getCityHourlyWeatherUseCase = new GetCityHourlyWeatherUseCaseBuilder().build();
        const getCityDailyWeatherUseCaseBuilder = new GetCityDailyWeatherUseCaseBuilder()
            .withExecute((request: GetCityDailyWeatherRequest, presenter: GetDailyWeatherPresenter) => {
                presenter.displayDailyWeather(dailyWeatherInCelsius);
            })
            .build();
    });
});
