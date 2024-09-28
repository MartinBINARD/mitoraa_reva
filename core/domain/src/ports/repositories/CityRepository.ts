import { City } from '@core/domain/src/entities/City';

export interface CityRepository {
    getCities(): Promise<City[]>;
}
