import { City } from '@core/domain/src/entities/City';
import { DailyWeather } from '@core/domain/src/entities/DailyWeather';
import { HourlyWeather } from '@core/domain/src/entities/HourlyWeather';
import { GetDailyWeatherPresenter } from '@core/domain/src/ports/presenters/GetDailyWeatherPresenter';
import { GetHourlyWeatherPresenter } from '@core/domain/src/ports/presenters/GetHourlyWeatherPresenter';
import { Presenter } from './Presenter';

export class CityPresenterVM {
    city: City | undefined;
    dailyWeather: DailyWeather[] | undefined;
    hourlyWeather: HourlyWeather[] | undefined;
    loading = false;
    temperatureUnite: 'C' | 'F' = 'C';
    speedUnite: 'km/h' | 'mph' = 'km/h';
    mode: 'hourly' | 'daily' = 'daily';
}

export class CityPresenter extends Presenter<CityPresenterVM> implements GetDailyWeatherPresenter, GetHourlyWeatherPresenter {
    constructor() {
        super(new CityPresenterVM());
    }

    displayCity(city: City): void {
        this.vm.city = city;
        this.notifyVM();
    }

    displayLoadingWeather() {
        this.vm.loading = true;
        this.vm.hourlyWeather = undefined;
        this.vm.dailyWeather = undefined;
        this.notifyVM();
    }

    displayHourlyWeather(weather: HourlyWeather[]): void {
        this.vm.hourlyWeather = weather;
        this.vm.loading = false;
        this.notifyVM();
    }

    displayDailyWeather(weather: DailyWeather[]): void {
        this.vm.dailyWeather = weather;
        this.vm.loading = false;
        this.notifyVM();
    }
}
