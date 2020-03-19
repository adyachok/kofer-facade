export class ModelSelection {
    model_id: string;
    model_name: string;
    data: any;

    constructor(model_id: string, model_name: string, data: any) {
        this.model_id = model_id;
        this.model_name = model_name;
        this.data = data;
    }

}