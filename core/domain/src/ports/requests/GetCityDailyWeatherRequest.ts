import { UnitTemperature } from '../../entities/UnitTemperature';

export class GetCityDailyWeatherRequest {
    constructor(public readonly city: string, public readonly unitTemperature: UnitTemperature = 'C') {}
}
