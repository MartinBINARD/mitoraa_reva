import { GetCitiesUseCase } from '@core/domain/src/usecases/GetCitiesUseCase';
import { CitiesPresenter } from '../../presenters/CitiesPresenter';
import { CitiesController } from '../CitiesController';

export class CitiesControllerFactory {
    constructor(private getCitiesUseCase: GetCitiesUseCase) {}

    build(): CitiesController {
        return new CitiesController(this.getCitiesUseCase, new CitiesPresenter());
    }
}
