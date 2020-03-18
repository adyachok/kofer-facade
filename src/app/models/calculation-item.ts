export class CalculationItem {
    public name: string
    public type: string
    public value: any

    constructor(name: string, type: string, value: any) {
        this.name = name;
        this.type = type;
        this.value = value;
    }

    public static fromJson(obj: any): CalculationItem {
        return new CalculationItem(obj.name, obj.type, obj.value);
    }

    public static createBlank(): CalculationItem {
        return new CalculationItem("ph", "", 6);
    }
}
    