import { City } from '@core/domain/src/entities/City';

export interface GetCitiesPresenter {
    displayCities(city: City[]): void;
}
