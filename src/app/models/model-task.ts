import { CalculationItem } from './calculation-item'

export class ModelTask {
    public _id: string
    public model_name: string
    public result: [any]
    public data: [CalculationItem]
    public state: string

    constructor(_id: string, model_name: string, result: any, data: [CalculationItem], state: string) {
        this._id = _id;
        this.model_name = model_name;
        this.result = result;
        this.data = data;
        this.state = state;
    }

    public static fromJson(obj: any): ModelTask {
        return new ModelTask(
            obj._id, 
            obj.model_name, 
            obj.result, 
            obj.data.map((o)=> CalculationItem.fromJson(o)), 
            obj.state);
    }

    public static createBlank(): ModelTask {
        return new ModelTask('wer1', 'fake-model', [[1]], [CalculationItem.createBlank()], 'Finished')
    }
}