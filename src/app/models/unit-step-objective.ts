export class UnitStepObjective {
    public target: string;

    constructor(target: string) {
        this.target = target;
    }

    public static fromJson(obj: any): UnitStepObjective {
        return new UnitStepObjective(obj.target);
    }

    public static createBlank() {
        return new UnitStepObjective("Elution (g/L)")
    }
}