import { HourlyWeather } from '../entities/HourlyWeather';
import { GetHourlyWeatherPresenter } from '../ports/presenters/GetHourlyWeatherPresenter';
import { WeatherRepository } from '../ports/repositories/WeatherRepository';
import { GetHourlyWeatherRequest } from '../ports/requests/GetHourlyWeatherRequest';

export class GetCityHourlyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {}

    private convertToFarenheit(temperature: number) {
        return temperature * (9 / 5) + 32;
    }

    private convertToMilesPerHour(speed: number) {
        return speed * 0.62;
    }

    async execute(request: GetHourlyWeatherRequest, presenter: GetHourlyWeatherPresenter) {
        presenter.displayLoadingWeather();
        const dayWeather: HourlyWeather[] = await this.weatherRepository
            .getCityHourlyWeather(request.city)
            .then((dayWeather: HourlyWeather[]) => {
                if (request.unitTemperature == 'F' && request.unitSpeed == 'mph') {
                    return dayWeather.map((hourWeather) => {
                        hourWeather.unit = 'F';
                        hourWeather.wind.unit = 'mph';
                        hourWeather.temperature = this.convertToFarenheit(hourWeather.temperature);
                        hourWeather.wind.speed = this.convertToMilesPerHour(hourWeather.wind.speed);
                    });
                } else {
                    return dayWeather;
                }
            });
        presenter.displayHourlyWeather(dayWeather);
    }
}
