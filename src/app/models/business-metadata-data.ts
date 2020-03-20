import { UnitStep } from './unit-step';


export class BusinessMetadataData {
    public unitSteps: UnitStep[];

    constructor(unitSteps: UnitStep[]){
        this.unitSteps = unitSteps;
    }

    public static fromJson(obj: any): BusinessMetadataData {
        const data = new BusinessMetadataData([]);
        for(let unitStep of obj.unitSteps) {
            data.unitSteps.push(UnitStep.fromJson(unitStep));
        }
        return data;
    }

    public static createBlank() {
        return new BusinessMetadataData([UnitStep.createBlank()]);
    }
}