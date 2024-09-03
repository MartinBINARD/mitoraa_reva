import { CityController } from '@core/adapters/src/controllers/CityController';
import { CityPresenter } from '@core/adapters/src/presenters/CityPresenter';
import { DailyWeather } from '@core/domain/src/entities/DailyWeather';
import { WeatherState } from '@core/domain/src/entities/WeatherState';
import { GetDailyWeatherPresenter } from '@core/domain/src/ports/presenters/GetDailyWeatherPresenter';
import { GetCityDailyWeatherRequest } from '@core/domain/src/ports/requests/GetCityDailyWeatherRequest';
import { GetCityDailyWeatherUseCaseBuilder } from '../builders/GetCityDailyWeatherUseCaseBuilder';
import { GetCityHourlyWeatherUseCaseBuilder } from '../builders/GetCityHourlyWeatherUseCaseBuilder';

describe('City Controller', () => {
    const dailyWeatherInCelsius: DailyWeather[] = [
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

    it('Should display city daily weather in metric : update daily weather vm', async () => {
        const getCityHourlyWeatherUseCase = new GetCityHourlyWeatherUseCaseBuilder().build();
        const getCityDailyWeatherUseCaseBuilder = new GetCityDailyWeatherUseCaseBuilder()
            .withExecute((request: GetCityDailyWeatherRequest, presenter: GetDailyWeatherPresenter) => {
                presenter.displayDailyWeather(dailyWeatherInCelsius);
            })
            .build();
        const controller = new CityController(
            'Papeete',
            getCityDailyWeatherUseCaseBuilder,
            getCityHourlyWeatherUseCase,
            new CityPresenter(),
        );
        controller.vm.mode = 'daily';

        await controller.fetchWeather();

        expect(controller.vm.dailyWeather).toHaveLength(2);
        expect(controller.vm.dailyWeather?.[0].weather).toBe(WeatherState.clear_sky);
        expect(controller.vm.dailyWeather?.[1].weather).toBe(WeatherState.few_clouds);
        expect(controller.vm.hourlyWeather).toBeUndefined();
    });

    it('Should display page loader when fetching city daily weather', async () => {
        const getCityHourlyWeatherUseCase = new GetCityHourlyWeatherUseCaseBuilder().build();
        const getCityDailyWeatherUseCaseBuilder = new GetCityDailyWeatherUseCaseBuilder()
            .withExecute((request: GetCityDailyWeatherRequest, presenter: GetDailyWeatherPresenter) => {
                presenter.displayLoadingWeather();
            })
            .build();
        const controller = new CityController(
            'Papeete',
            getCityDailyWeatherUseCaseBuilder,
            getCityHourlyWeatherUseCase,
            new CityPresenter(),
        );
        controller.vm.mode = 'daily';

        await controller.fetchWeather();

        expect(controller.vm.loading).toBeTruthy();
    });

    it('Should hide page loader when city daily weather fetched', async () => {
        const getCityHourlyWeatherUseCase = new GetCityHourlyWeatherUseCaseBuilder().build();
        const getCityDailyWeatherUseCaseBuilder = new GetCityDailyWeatherUseCaseBuilder()
            .withExecute((request: GetCityDailyWeatherRequest, presenter: GetDailyWeatherPresenter) => presenter.displayDailyWeather([]))
            .build();
        const controller = new CityController(
            'Papeete',
            getCityDailyWeatherUseCaseBuilder,
            getCityHourlyWeatherUseCase,
            new CityPresenter(),
        );
        controller.vm.loading = true;

        await controller.fetchWeather();

        expect(controller.vm.loading).toBeFalsy();
    });

    it('Should fetch daily weather with imperial unit selected', async () => {
        const fetchRequest = await new Promise<GetCityDailyWeatherRequest>((resolve) => {
            const getCityHourlyWeatherUseCase = new GetCityHourlyWeatherUseCaseBuilder().build();
            const getCityDailyWeatherUseCaseBuilder = new GetCityDailyWeatherUseCaseBuilder()
                .withExecute((request) => resolve(request))
                .build();
            const controller = new CityController(
                'Papeete',
                getCityDailyWeatherUseCaseBuilder,
                getCityHourlyWeatherUseCase,
                new CityPresenter(),
            );
            controller.vm.temperatureUnite = 'F';

            controller.fetchWeather();
        });

        expect(fetchRequest.unitTemperature).toBe('F');
    });
});
