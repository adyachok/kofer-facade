export class TargetVariable {
    public name: string;
    public description: string;
    public type: string;
    public unit: string;
    public stepsize: number;

    constructor(
        name: string,
        description: string,
        type: string,
        unit: string,
        stepsize: number
    ) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.unit = unit;
        this.stepsize = stepsize;
    }

    public static fromJson(obj): TargetVariable {
        return new TargetVariable(obj.name, obj.description, obj.type, obj.unit, obj.stepsize);
    }

    public static createBlank() {
        return new TargetVariable("Elution (g/L)", "Elution (g/L)", "float", "g/L", 0.1);
    }
}