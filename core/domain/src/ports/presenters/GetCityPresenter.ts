import { City } from '@core/domain/src/entities/City';

export interface GetCityPresenter {
    displayCity(city: City): void;
}
