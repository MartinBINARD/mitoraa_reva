import { GetCityPresenter } from '../ports/presenters/GetCityPresenter';
import { CityRepository } from '../ports/repositories/CityRepository';
import { GetCityRequest } from '../ports/requests/GetCityRequest';

export class GetCityUseCase {
    constructor(private readonly cityRepository: CityRepository) {}

    async execute(request: GetCityRequest, presenter: GetCityPresenter) {
        presenter.displayCity(await this.cityRepository.getCity(request.city));
    }
}
