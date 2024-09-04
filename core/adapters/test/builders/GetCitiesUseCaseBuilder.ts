import { GetCitiesPresenter } from '@core/domain/src/ports/presenters/GetCitiesPresenter';
import { GetCitiesUseCase } from '@core/domain/src/usecases/GetCitiesUseCase';

export class GetCitiesUseCaseBuilder {
    private execute: (presenter: GetCitiesPresenter) => Promise<void> = () => Promise.resolve();

    withExecute(execute: (presenter: GetCitiesPresenter) => Promise<void>) {
        this.execute = execute;
        return this;
    }

    build(): GetCitiesUseCase {
        return { execute: this.execute } as GetCitiesUseCase;
    }
}
