import { Location } from '../../entities/Location';
import { UnitDegree } from '../../entities/UnitDegree';
import { UnitSpeed } from '../../entities/UnitSpeed';

export class GetLocalHourlyWeatherRequest {
    constructor(
        public readonly location: Location = { latitude: -17.539411652985727, longitude: -149.56722535642385 },
        public readonly unitTemperature: UnitDegree = 'C',
        public readonly unitSpeed: UnitSpeed = 'km/s',
    ) {}
}
