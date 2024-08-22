import { City } from '../src/entities/City';
import { CityRepository } from '../src/ports/repositories/CityRepository';
import { GetCityRequest } from '../src/ports/requests/GetCityRequest';

describe('Get city use case', () => {
    it('display city', async () => {
        const cityName = 'Papeete';
        const papeete = { name: cityName, location: { latitude: -17.689001, longitude: -149.5849327 } };
        const cityRepository: Partial<CityRepository> = {
            getCity(_: string): Promise<City> {
                return Promise.resolve(papeete);
            },
        };

        const useCase = new GetCityUseCase(cityRepository as CityRepository);

        const city = await new Promise((resolve) => {
            useCase.execute(new GetCityRequest(cityName), {
                displayCity(city: City) {
                    resolve(city);
                },
            });
        });

        expect(city).toBe(papeete);
    });
});
