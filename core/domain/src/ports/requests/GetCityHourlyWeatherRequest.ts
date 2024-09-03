import { UnitSpeed } from '../../entities/UnitSpeed';
import { UnitTemperature } from '../../entities/UnitTemperature';

export class GetCityHourlyWeatherRequest {
    constructor(
        public readonly city: string,
        public readonly unitTemperature: UnitTemperature = 'C',
        public readonly unitSpeed: UnitSpeed = 'km/s',
    ) {}
}
