import { CalculationItem } from './calculation-item'

export class ModelTask {
    public _id: string
    public modelName: string
    public result: [any]
    public data: CalculationItem[];
    public state: string
    public runnerId: string
    public executionState: number = 0

    constructor(_id: string, modelName: string, result: any, data: CalculationItem[], state: string, runnerId: string = '', executionState: number = 0) {
        this._id = _id;
        this.modelName = modelName;
        this.result = result;
        this.data = data;
        this.state = state;
        this.runnerId = runnerId;
        this.executionState = executionState;
    }

    public static fromJson(obj: any): ModelTask {
        return new ModelTask(
            obj._id, 
            obj.modelName, 
            obj.result, 
            obj.data.map((o)=> CalculationItem.fromJson(o)), 
            obj.state, 
            obj?.runnerId,
            obj?.executionState
            );
    }

    public static createBlank(): ModelTask {
        return new ModelTask('wer1', 'fake-model', [[1]], [CalculationItem.createBlank()], 'Finished')
    }
}