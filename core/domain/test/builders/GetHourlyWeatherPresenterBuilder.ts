import { HourlyWeather } from '@core/domain/src/entities/HourlyWeather';
import { GetHourlyWeatherPresenter } from '@core/domain/src/ports/presenters/GetHourlyWeatherPresenter';

export class GetHourlyWeatherPresenterBuilder {
    private displayLoadingWeather: () => void = () => null;
    private displayWeather: (weather: HourlyWeather[]) => void = () => null;

    withDisplayWeather(displayWeather: (weather: HourlyWeather[]) => void) {
        this.displayWeather = displayWeather;
        return this;
    }

    build(): GetHourlyWeatherPresenter {
        return {
            displayLoadingWeather: this.displayLoadingWeather,
            displayHourlyWeather: this.displayWeather,
        };
    }
}
