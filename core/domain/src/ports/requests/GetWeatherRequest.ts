import { UniteDegree } from '@core/domain/src/entities/UniteDegree';

export class GetDailyWeatherRequest {
    constructor(public readonly city: string, public readonly unite: UniteDegree = 'C') {}
}
