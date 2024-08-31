import { GetDailyWeatherPresenter } from '@core/domain/src/ports/presenters/GetDailyWeatherPresenter';
import { GetCityDailyWeatherRequest } from '@core/domain/src/ports/requests/GetCityDailyWeatherRequest';
import { GetCityDailyWeatherUseCase } from '@core/domain/src/usecases/GetCityDailyWeatherUseCase';

export class GetCityDailyWeatherUseCaseBuilder {
    private execute: (request: GetCityDailyWeatherRequest, presenter: GetDailyWeatherPresenter) => void = () => null;

    withExecute(execute: (request: GetCityDailyWeatherRequest, presenter: GetDailyWeatherPresenter) => void) {
        this.execute = execute;
        return this;
    }

    build(): GetCityDailyWeatherUseCase {
        return { execute: this.execute } as GetCityDailyWeatherUseCase;
    }
}
