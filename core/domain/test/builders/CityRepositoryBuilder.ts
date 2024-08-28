import { City } from '@core/domain/src/entities/City';
import { CityRepository } from '@core/domain/src/ports/repositories/CityRepository';

export class CityRepositoryBuilder {
    private getCity: (city: string) => Promise<City> = () =>
        Promise.resolve({ name: 'Papeete', location: { latitude: -17.689001, longitude: -149.5849327 } });
    private getCities: () => Promise<City[]> = () => Promise.resolve([]);

    withGetCity(getCity: (city: string) => Promise<City>) {
        this.getCity = getCity;
        return this;
    }

    withGetCities(getCities: () => Promise<City[]>) {
        this.getCities = getCities;
        return this;
    }

    build(): CityRepository {
        return {
            getCity: this.getCity,
            getCities: this.getCities,
        };
    }
}
