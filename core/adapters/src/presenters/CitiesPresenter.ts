import { City } from '@core/domain/src/entities/City';
import { GetCitiesPresenter } from '@core/domain/src/ports/presenters/GetCitiesPresenter';
import { Presenter } from './Presenter';

export class CitiesPresenterVM {
    cities: City[] | undefined;
}

export class CitiesPresenter extends Presenter<CitiesPresenterVM> implements GetCitiesPresenter {
    constructor() {
        super(new CitiesPresenterVM());
    }

    displayCities(cities: City[]): void {
        this.vm.cities = cities;
        this.notifyVM();
    }
}
