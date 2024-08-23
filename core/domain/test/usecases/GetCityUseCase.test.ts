import { City } from '@core/domain/src/entities/City';
import { CityRepository } from '@core/domain/src/ports/repositories/CityRepository';
import { GetCityRequest } from '@core/domain/src/ports/requests/GetCityRequest';
import { GetCityUseCase } from '@core/domain/src/usecases/GetCityUseCase';

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
