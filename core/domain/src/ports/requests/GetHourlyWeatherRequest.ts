import { UniteDegree } from '../../entities/UniteDegree';

export class GetHourlyWeatherRequest {
    constructor(public readonly city: string, public readonly unitTemperature: UniteDegree = 'C', public readonly unitSpeed = 'km/s') {}
}
