export class CalculationItem {
    public name: string
    public type: string
    public value: any
    public unit_step: string

    constructor(name: string, type: string, value: any, unit_step: string) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.unit_step = unit_step;
    }

    public static fromJson(obj: any): CalculationItem {
        return new CalculationItem(obj.name, obj.type, obj.value, obj.unit_step);
    }

    public static createBlank(): CalculationItem {
        return new CalculationItem("ph", "int", 6, "chromatography");
    }
}
    