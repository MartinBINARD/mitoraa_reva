import { CityController } from '@core/adapters/src/controllers/CityController';
import { CityPresenter } from '@core/adapters/src/presenters/CityPresenter';
import { DailyWeather } from '@core/domain/src/entities/DailyWeather';
import { HourlyWeather } from '@core/domain/src/entities/HourlyWeather';
import { WeatherState } from '@core/domain/src/entities/WeatherState';
import { GetDailyWeatherPresenter } from '@core/domain/src/ports/presenters/GetDailyWeatherPresenter';
import { GetHourlyWeatherPresenter } from '@core/domain/src/ports/presenters/GetHourlyWeatherPresenter';
import { GetCityDailyWeatherRequest } from '@core/domain/src/ports/requests/GetCityDailyWeatherRequest';
import { GetCityHourlyWeatherRequest } from '@core/domain/src/ports/requests/GetCityHourlyWeatherRequest';
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

    it('Should display city hourly weather in metric : update hourly weather vm', async () => {
        const getCityHourlyWeatherUseCase = new GetCityHourlyWeatherUseCaseBuilder()
            .withExecute((request: GetCityHourlyWeatherRequest, presenter: GetHourlyWeatherPresenter) =>
                presenter.displayHourlyWeather(hourlyWeatherInMetric),
            )
            .build();
        const getCityDailyWeatherUseCaseBuilder = new GetCityDailyWeatherUseCaseBuilder().build();
        const controller = new CityController(
            'Papeete',
            getCityDailyWeatherUseCaseBuilder,
            getCityHourlyWeatherUseCase,
            new CityPresenter(),
        );
        controller.vm.mode = 'hourly';

        await controller.fetchWeather();

        expect(controller.vm.hourlyWeather).toHaveLength(2);
        expect(controller.vm.hourlyWeather?.[0].weather).toBe(WeatherState.clear_sky);
        expect(controller.vm.hourlyWeather?.[0].unitTemperature).toBe('C');
        expect(controller.vm.hourlyWeather?.[1].wind.unitSpeed).toBe('km/h');
        expect(controller.vm.dailyWeather).toBeUndefined();
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

    it('Should display page loader when fetching city hourly weather', async () => {
        const getCityDailyWeatherUseCaseBuilder = new GetCityDailyWeatherUseCaseBuilder().build();
        const getCityHourlyWeatherUseCase = new GetCityHourlyWeatherUseCaseBuilder()
            .withExecute((request: GetCityHourlyWeatherRequest, presenter: GetHourlyWeatherPresenter) => {
                presenter.displayLoadingWeather();
            })
            .build();
        const controller = new CityController(
            'Papeete',
            getCityDailyWeatherUseCaseBuilder,
            getCityHourlyWeatherUseCase,
            new CityPresenter(),
        );
        controller.vm.mode = 'hourly';

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

    it('Should hide page loader when city hourly weather fetched', async () => {
        const getCityDailyWeatherUseCaseBuilder = new GetCityDailyWeatherUseCaseBuilder().build();
        const getCityHourlyWeatherUseCase = new GetCityHourlyWeatherUseCaseBuilder()
            .withExecute((request: GetCityHourlyWeatherRequest, presenter: GetHourlyWeatherPresenter) => {
                presenter.displayHourlyWeather([]);
            })
            .build();
        const controller = new CityController(
            'Papeete',
            getCityDailyWeatherUseCaseBuilder,
            getCityHourlyWeatherUseCase,
            new CityPresenter(),
        );
        controller.vm.mode = 'hourly';
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
