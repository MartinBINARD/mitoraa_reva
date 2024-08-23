import { WeatherRepository } from '../ports/repositories/WeatherRepository';

export class GetCityDailyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {}
}
