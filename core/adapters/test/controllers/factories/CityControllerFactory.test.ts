import { CityControllerFactory } from '@core/adapters/src/controllers/factories/CityControllerFactory';
import { GetCityDailyWeatherUseCaseBuilder } from '../../builders/GetCityDailyWeatherUseCaseBuilder';
import { GetCityHourlyWeatherUseCaseBuilder } from '../../builders/GetCityHourlyWeatherUseCaseBuilder';

describe('City Controller Factory', () => {
    it('Create City Presenter', () => {
        const factory = new CityControllerFactory(
            new GetCityDailyWeatherUseCaseBuilder().build(),
            new GetCityHourlyWeatherUseCaseBuilder().build(),
        );

        const presenter = factory.build('Papeete');

        expect(presenter).not.toBeNull();
    });
});
