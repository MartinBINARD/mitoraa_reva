import { UnitSpeed } from '../../entities/UnitSpeed';
import { UnitDegree } from '../../entities/UnitTemperature';

export class GetCityHourlyWeatherRequest {
    constructor(
        public readonly city: string,
        public readonly unitTemperature: UnitDegree = 'C',
        public readonly unitSpeed: UnitSpeed = 'km/s',
    ) {}
}
