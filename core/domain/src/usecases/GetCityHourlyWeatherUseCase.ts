import { HourlyWeather } from '../entities/HourlyWeather';
import { GetHourlyWeatherPresenter } from '../ports/presenters/GetHourlyWeatherPresenter';
import { WeatherRepository } from '../ports/repositories/WeatherRepository';
import { GetCityHourlyWeatherRequest } from '../ports/requests/GetCityHourlyWeatherRequest';

export class GetCityHourlyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {}

    private convertToFarenheit(temperature: number) {
        return temperature * (9 / 5) + 32;
    }

    private convertToMilesPerHour(speed: number) {
        const speedInMiles = speed * 0.62;

        return Math.round(speedInMiles * 10) / 10;
    }

    async execute(request: GetCityHourlyWeatherRequest, presenter: GetHourlyWeatherPresenter) {
        presenter.displayLoadingWeather();
        const dayWeather: HourlyWeather[] = await this.weatherRepository
            .getCityHourlyWeather(request.city)
            .then((dayWeather: HourlyWeather[]) => {
                if (request.unitTemperature == 'F' && request.unitSpeed == 'mph') {
                    return dayWeather.map((hourWeather) => {
                        hourWeather.unitTemperature = 'F';
                        hourWeather.wind.unitSpeed = 'mph';
                        hourWeather.temperature = this.convertToFarenheit(hourWeather.temperature);
                        hourWeather.wind.speed = this.convertToMilesPerHour(hourWeather.wind.speed);

                        return hourWeather;
                    });
                } else {
                    return dayWeather;
                }
            });
        presenter.displayHourlyWeather(dayWeather);
    }
}
