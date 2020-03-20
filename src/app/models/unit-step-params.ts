import { TrainingRange } from './training-range'
import { TargetVariable } from './targer-variable';
import { UnitStepObjective } from './unit-step-objective';

export class UnitStepParams {
    training_ranges: TrainingRange[];
    target_variable: TargetVariable[];
    objectives: UnitStepObjective[];

    constructor(
        training_ranges: TrainingRange[],
        target_variable: TargetVariable[],
        objectives: UnitStepObjective[]) {

            this.training_ranges = training_ranges;
            this.target_variable = target_variable;
            this.objectives = objectives;
        }

    public static fromJson(obj: any): UnitStepParams {
        const params = new UnitStepParams([], [], []);
        for(let training_range of obj.training_ranges) {
            params.training_ranges.push(TrainingRange.fromJson(training_range))
        }
        for(let target_variable of obj.target_variable) {
            params.target_variable.push(TargetVariable.fromJson(target_variable))
        }
        for(let objective of obj.objectives) {
            params.objectives.push(UnitStepObjective.fromJson(objective))
        }
        return params;
    }

    public static createBlank() {
        return new UnitStepParams(
            [TrainingRange.createBlank()], 
            [TargetVariable.createBlank()], 
            [UnitStepObjective.createBlank()]);
    }
}