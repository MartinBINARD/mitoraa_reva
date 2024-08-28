import { City } from '@core/domain/src/entities/City';
import { CityRepository } from '@core/domain/src/ports/repositories/CityRepository';

export class CityRepositoryBuilder {
    private getCities: () => Promise<City[]> = () => Promise.resolve([]);

    withGetCities(getCities: () => Promise<City[]>) {
        this.getCities = getCities;
        return this;
    }

    build(): CityRepository {
        return {
            getCities: this.getCities,
        };
    }
}
