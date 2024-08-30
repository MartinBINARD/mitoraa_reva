import { GetCitiesUseCase } from '@core/domain/src/usecases/GetCitiesUseCase';
import { CitiesPresenter, CitiesPresenterVM } from '../presenters/CitiesPresenter';
import { Controller } from './Controller';

export class CitiesController extends Controller<CitiesPresenterVM> {
    constructor(private readonly getCitiesUseCase: GetCitiesUseCase, private readonly presenter: CitiesPresenter) {
        super(presenter);
    }

    fetchCities() {
        this.getCitiesUseCase.execute(this.presenter);
    }
}
