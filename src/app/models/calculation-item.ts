export class CalculationItem {
    public name: string
    public type: string
    public value: any
    public unitStep: string

    constructor(name: string, type: string, value: any, unitStep: string) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.unitStep = unitStep;
    }

    public static fromJson(obj: any): CalculationItem {
        return new CalculationItem(obj.name, obj.type, obj.value, obj.unitStep);
    }

    public static createBlank(): CalculationItem {
        return new CalculationItem("ph", "int", 6, "chromatography");
    }
}
    