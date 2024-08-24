import { City } from '@core/domain/src/entities/City';

export interface CityRepository {
    getCity(city: string): Promise<City>;
    getCities(): Promise<City[]>;
}
