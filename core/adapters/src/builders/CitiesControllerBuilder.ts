import { CitiesController } from '../controllers/CitiesController';
import { CitiesPresenterVM } from '../presenters/CitiesPresenter';
import { Subscriber } from '../presenters/Presenter';

export class CitiesControllerBuilder {
    private fetchCities: () => void = () => {};
    private onVmUpdate: (subscriber: Subscriber<CitiesPresenterVM>) => void = (subscriber) => subscriber(this.vm);

    constructor(private vm: CitiesPresenterVM = new CitiesPresenterVM()) {}

    withFetchCities(fetchCities: () => Promise<void>) {
        this.fetchCities = fetchCities;
        return this;
    }

    build(): CitiesController {
        return {
            vm: this.vm,
            subscribeVM: this.onVmUpdate,
            fetchCities: this.fetchCities,
        } as unknown as CitiesController;
    }
}
