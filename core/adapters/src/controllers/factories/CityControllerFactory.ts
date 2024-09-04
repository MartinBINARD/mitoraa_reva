import { GetCityDailyWeatherUseCase } from '@core/domain/src/usecases/GetCityDailyWeatherUseCase';
import { GetCityHourlyWeatherUseCase } from '@core/domain/src/usecases/GetCityHourlyWeatherUseCase';
import { CityPresenter } from '../../presenters/CityPresenter';
import { CityController } from '../CityController';

export class CityControllerFactory {
    constructor(
        private getCityDailyWeatherUseCase: GetCityDailyWeatherUseCase,
        private getCityHourlyWeatherUseCase: GetCityHourlyWeatherUseCase,
    ) {}

    build(cityName: string): CityController {
        return new CityController(cityName, this.getCityDailyWeatherUseCase, this.getCityHourlyWeatherUseCase, new CityPresenter());
    }
}
