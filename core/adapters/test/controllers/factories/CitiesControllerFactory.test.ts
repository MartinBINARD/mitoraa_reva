import { CitiesControllerFactory } from '@core/adapters/src/controllers/factories/CitiesControllerFactory';
import { GetCitiesUseCaseBuilder } from '../../builders/GetCitiesUseCaseBuilder';

describe('Cities Controller Factory', () => {
    it('Create Cities  Presenter', () => {
        const factory = new CitiesControllerFactory(new GetCitiesUseCaseBuilder().build());

        const presenter = factory.build();

        expect(presenter).not.toBeNull();
    });
});
