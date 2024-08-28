import { HourlyWeather } from '../entities/HourlyWeather';
import { GetHourlyWeatherPresenter } from '../ports/presenters/GetHourlyWeatherPresenter';
import { WeatherRepository } from '../ports/repositories/WeatherRepository';
import { GetLocalHourlyWeatherRequest } from '../ports/requests/GetLocalHourlyRequest';

export class GetLocalHourlyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {}

    private convertToFarenheit(temperature: number) {
        return temperature * (9 / 5) + 32;
    }

    private convertToMilesPerHour(speed: number) {
        const speedInMiles = speed * 0.62;

        return Math.round(speedInMiles * 10) / 10;
    }

    async execute(request: GetLocalHourlyWeatherRequest, presenter: GetHourlyWeatherPresenter) {
        presenter.displayLoadingWeather();
        const dayWeather: HourlyWeather[] = await this.weatherRepository
            .getLocalHourlyWeather(request.location)
            .then((dayWeather: HourlyWeather[]) => {
                if (request.unitTemperature == 'F' && request.unitSpeed == 'mph') {
                    return dayWeather.map((hourWeather) => {
                        hourWeather.unit = 'F';
                        hourWeather.wind.unit = 'mph';
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
