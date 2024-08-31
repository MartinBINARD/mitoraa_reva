import { GetHourlyWeatherPresenter } from '@core/domain/src/ports/presenters/GetHourlyWeatherPresenter';
import { GetCityHourlyWeatherRequest } from '@core/domain/src/ports/requests/GetCityHourlyWeatherRequest';
import { GetCityHourlyWeatherUseCase } from '@core/domain/src/usecases/GetCityHourlyWeatherUseCase';

export class GetCityHourlyWeatherUseCaseBuilder {
    private execute: (request: GetCityHourlyWeatherRequest, presenter: GetHourlyWeatherPresenter) => void = () => null;

    withExecute(execute: (request: GetCityHourlyWeatherRequest, presenter: GetHourlyWeatherPresenter) => void) {
        this.execute = execute;
        return this;
    }

    build(): GetCityHourlyWeatherUseCase {
        return { execute: this.execute } as GetCityHourlyWeatherUseCase;
    }
}
