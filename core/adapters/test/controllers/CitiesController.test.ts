import { CitiesController } from '@core/adapters/src/controllers/CitiesController';
import { CitiesPresenter } from '@core/adapters/src/presenters/CitiesPresenter';
import { GetCitiesPresenter } from '@core/domain/src/ports/presenters/GetCitiesPresenter';
import { GetCitiesUseCaseBuilder } from '../builders/GetCitiesUseCaseBuilder';

describe('Cities controller', () => {
    const cities = [
        { name: 'Papeete', location: { latitude: -17.539340618111417, longitude: -149.5671898931278 } },
        { name: 'Punaauia', location: { latitude: -17.59404582969708, longitude: -149.6119399865058 } },
    ];

    it('Should fetch cities: update cities vm', async () => {
        const getCitiesUseCase = new GetCitiesUseCaseBuilder()
            .withExecute((presenter: GetCitiesPresenter) => {
                presenter.displayCities(cities);

                return Promise.resolve();
            })
            .build();
        const presenter = new CitiesController(getCitiesUseCase, new CitiesPresenter());

        await presenter.fetchCities();

        expect(presenter.vm.cities).toEqual(cities);
    });
});
