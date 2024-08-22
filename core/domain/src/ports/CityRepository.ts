import { City } from '../entities/City';

export interface CityRepository {
    getCity(city: string): Promise<City>;
    getCities(): Promise<City[]>;
}
