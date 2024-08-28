import { GetCitiesPresenter } from '../ports/presenters/GetCitiesPresenter';
import { CityRepository } from '../ports/repositories/CityRepository';

export class GetCitiesUseCase {
    constructor(private cityRepository: CityRepository) {}

    async execute(presenter: GetCitiesPresenter) {
        const cities = await this.cityRepository.getCities();
        presenter.displayCities(cities);
    }
}
