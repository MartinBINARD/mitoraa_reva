import { UnitDegree } from '../../entities/UnitDegree';

export class GetHourlyWeatherRequest {
    constructor(public readonly city: string, public readonly unitTemperature: UnitDegree = 'C', public readonly unitSpeed = 'km/s') {}
}
