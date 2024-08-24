import { UnitDegree } from '@core/domain/src/entities/UnitDegree';

export class GetDailyWeatherRequest {
    constructor(public readonly city: string, public readonly unite: UnitDegree = 'C') {}
}
