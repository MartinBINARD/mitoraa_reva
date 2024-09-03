import { UnitDegree } from '@core/domain/src/entities/UnitDegree';

export class GetCityDailyWeatherRequest {
    constructor(public readonly city: string, public readonly unitTemperature: UnitDegree = 'C') {}
}
