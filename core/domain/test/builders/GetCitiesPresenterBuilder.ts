import { City } from '@core/domain/src/entities/City';
import { GetCitiesPresenter } from '@core/domain/src/ports/presenters/GetCitiesPresenter';

export class GetCitiesPresenterBuilder {
    private displayCities: (city: City[]) => void = () => null;

    withDisplayCities(displayCities: (city: City[]) => void) {
        this.displayCities = displayCities;
        return this;
    }

    build(): GetCitiesPresenter {
        return {
            displayCities: this.displayCities,
        };
    }
}
