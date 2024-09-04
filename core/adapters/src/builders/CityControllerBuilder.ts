import { CityController } from '../controllers/CityController';
import { CityPresenterVM } from '../presenters/CityPresenter';
import { Subscriber } from '../presenters/Presenter';

export class CityControllerBuilder {
    private fetchWeather: () => void = () => {};
    private updateMode: (mode: 'daily' | 'hourly') => void = () => null;
    private updateTemperatureUnit: (temperatureUnit: 'C' | 'F') => void = () => null;
    private updateSpeedUnit: (speedUnit: 'km/h' | 'mph') => void = () => null;
    private onVmUpdate: (subscriber: Subscriber<CityPresenterVM>) => void = (subscriber) => subscriber(this.vm);

    constructor(private vm: CityPresenterVM = new CityPresenterVM()) {}

    witchFetchWeather(fetchWeather: () => Promise<void>) {
        this.fetchWeather = fetchWeather;
        return this;
    }

    withUpdateMode(updateMode: (mode: 'daily' | 'hourly') => void) {
        this.updateMode = updateMode;
        return this;
    }

    withUpdateTemperatureUnit(updateTemperatureUnit: (temperatureUnit: 'C' | 'F') => void) {
        this.updateTemperatureUnit = updateTemperatureUnit;
        return this;
    }

    withUpdateSpeedUnit(updateSpeedUnit: (speedUnit: 'km/h' | 'mph') => void) {
        this.updateSpeedUnit = updateSpeedUnit;
        return this;
    }

    build(): CityController {
        return {
            vm: this.vm,
            subscribeVM: this.onVmUpdate,
            fetchWeather: this.fetchWeather,
            updateMode: this.updateMode,
            updateTemperatureUnit: this.updateTemperatureUnit,
            updateSpeedUnit: this.updateSpeedUnit,
        } as unknown as CityController;
    }
}
