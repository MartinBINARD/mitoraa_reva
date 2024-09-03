import { Location } from '../../entities/Location';
import { UnitSpeed } from '../../entities/UnitSpeed';
import { UnitTemperature } from '../../entities/UnitTemperature';

export class GetLocalHourlyWeatherRequest {
    constructor(
        public readonly location: Location = { latitude: -17.539411652985727, longitude: -149.56722535642385 },
        public readonly unitTemperature: UnitTemperature = 'C',
        public readonly unitSpeed: UnitSpeed = 'km/s',
    ) {}
}
