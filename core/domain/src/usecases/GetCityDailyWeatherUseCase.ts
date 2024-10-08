import { DailyWeather } from '../entities/DailyWeather';
import { GetDailyWeatherPresenter } from '../ports/presenters/GetDailyWeatherPresenter';
import { WeatherRepository } from '../ports/repositories/WeatherRepository';
import { GetCityDailyWeatherRequest } from '../ports/requests/GetCityDailyWeatherRequest';

export class GetCityDailyWeatherUseCase {
    constructor(private readonly weatherRepository: WeatherRepository) {}

    private convertToFarenheit(temperature: number) {
        return temperature * (9 / 5) + 32;
    }

    async execute(request: GetCityDailyWeatherRequest, presenter: GetDailyWeatherPresenter) {
        presenter.displayLoadingWeather();
        const weekWeather: DailyWeather[] = await this.weatherRepository
            .getCityDailyWeather(request.city)
            .then((weekWeather: DailyWeather[]) => {
                if (request.unitTemperature == 'F') {
                    return weekWeather.map((dayWeather) => {
                        dayWeather.unitTemperature = 'F';
                        dayWeather.temperatureMax = this.convertToFarenheit(dayWeather.temperatureMax);
                        dayWeather.temperatureMin = this.convertToFarenheit(dayWeather.temperatureMin);

                        return dayWeather;
                    });
                } else {
                    return weekWeather;
                }
            });
        presenter.displayDailyWeather(weekWeather);
    }
}
