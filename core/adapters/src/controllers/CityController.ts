import { GetCityDailyWeatherRequest } from '@core/domain/src/ports/requests/GetCityDailyWeatherRequest';
import { GetCityHourlyWeatherRequest } from '@core/domain/src/ports/requests/GetCityHourlyWeatherRequest';
import { GetCityDailyWeatherUseCase } from '@core/domain/src/usecases/GetCityDailyWeatherUseCase';
import { GetCityHourlyWeatherUseCase } from '@core/domain/src/usecases/GetCityHourlyWeatherUseCase';
import { CityPresenter, CityPresenterVM } from '../presenters/CityPresenter';
import { Controller } from './Controller';

export class CityController extends Controller<CityPresenterVM> {
    constructor(
        private cityName: string,
        private getCityDailyWeatherUseCase: GetCityDailyWeatherUseCase,
        private getCityHourlyWeatherUseCase: GetCityHourlyWeatherUseCase,
        private presenter: CityPresenter,
    ) {
        super(presenter);
    }

    fetchWeather() {
        if (this.presenter.vm.mode === 'daily') {
            this.getCityDailyWeatherUseCase.execute(
                new GetCityDailyWeatherRequest(this.cityName, this.presenter.vm.temperatureUnite),
                this.presenter,
            );
        } else {
            this.getCityHourlyWeatherUseCase.execute(
                new GetCityHourlyWeatherRequest(this.cityName, this.presenter.vm.temperatureUnite, this.presenter.vm.speedUnite),
                this.presenter,
            );
        }
    }

    updateTemperatureUnite(temperatureUnite: 'C' | 'F') {
        this.presenter.vm.temperatureUnite = temperatureUnite;
        this.fetchWeather();
    }

    updateSpeedUnite(speedUnite: 'km/h' | 'mph') {
        this.presenter.vm.speedUnite = speedUnite;
        this.fetchWeather();
    }
}
