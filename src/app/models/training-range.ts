export class TrainingRange {
    public name: string;
    public description: string;
    public type: string;
    public unit: string;
    public min: number;
    public max: number;
    public stepsize: number;

    constructor(
        name: string,
        description: string,
        type: string,
        unit: string,
        min: number,
        max: number,
        stepsize: number) { 
            this.name = name;
            this.description = description;
            this.type = type;
            this.unit = unit;
            this.min = min;
            this.max = max;
            this.stepsize = stepsize;
        }

    public static fromJson(obj):TrainingRange {
        return new TrainingRange(obj.name, obj.description, obj.type, obj.unit, obj.min, obj.max, obj.stepsize);
    }

    public static createBlank():TrainingRange {
        return new TrainingRange('ph', 'Process ph concentration', 'float', 'g/L', 6, 9, 0.1);
    }
}