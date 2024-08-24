import { GetDailyWeatherPresenter } from '../ports/presenters/GetDailyWeatherPresenter';
import { WeatherRepository } from '../ports/repositories/WeatherRepository';
import { GetDailyWeatherRequest } from '../ports/requests/GetWeatherRequest';

export class GetCityDailyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {}

    async execute(request: GetDailyWeatherRequest, presenter: GetDailyWeatherPresenter) {
        presenter.displayLoadingWeather();
        presenter.displayDailyWeather(await this.weatherRepository.getCityDailyWeather(request.city));
    }
}
