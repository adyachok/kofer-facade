import { UnitStepParams } from './unit-step-params'

export class UnitStep {
    name: string;
    params: UnitStepParams;

    constructor(
        name: string,
        params: UnitStepParams) {
            this.name = name;
            this.params = params;
        }

    public static fromJson(obj: any): UnitStep {
        return new UnitStep(obj.name, UnitStepParams.fromJson(obj.params));
    }

    public static createBlank(): UnitStep {
        return new UnitStep("chromatography", UnitStepParams.createBlank());
    }
}