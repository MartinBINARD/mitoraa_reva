import { DailyWeather } from '@core/domain/src/entities/DailyWeather';
import { GetDailyWeatherPresenter } from '@core/domain/src/ports/presenters/GetDailyWeatherPresenter';

export class GetDailyWeatherPresenterBuilder {
    private displayLoadingWeather: () => void = () => null;
    private displayWeather: (weather: DailyWeather[]) => void = () => null;

    withDisplayWeather(displayWeather: (weather: DailyWeather[]) => void) {
        this.displayWeather = displayWeather;
        return this;
    }

    build(): GetDailyWeatherPresenter {
        return {
            displayLoadingWeather: this.displayLoadingWeather,
            displayDailyWeather: this.displayWeather,
        };
    }
}
