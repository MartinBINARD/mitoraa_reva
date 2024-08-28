import { GetCitiesUseCase } from '@core/domain/src/usecases/GetCitiesUseCase';
import { CityRepositoryBuilder } from '../builders/CityRepositoryBuilder';
import { GetCitiesPresenterBuilder } from '../builders/GetCitiesPresenterBuilder';

describe('Get cities use case', () => {
    it('Should display cities', async () => {
        const citiesList = [
            { name: 'Papeete', location: { latitude: -17.539340618111417, longitude: -149.5671898931278 } },
            { name: 'Punaauia', location: { latitude: -17.59404582969708, longitude: -149.6119399865058 } },
        ];
        return new Promise((resolve) => {
            const cityRepository = new CityRepositoryBuilder().withGetCities(() => Promise.resolve(citiesList)).build();
            const useCase = new GetCitiesUseCase(cityRepository);
            const presenter = new GetCitiesPresenterBuilder().withDisplayCities((cities) => resolve(cities)).build();

            useCase.execute(presenter);
        }).then((cities) => {
            expect(cities).not.toBeNull();
            expect(cities).toHaveLength(2);
            expect(cities).toEqual(citiesList);
        });
    });
});
