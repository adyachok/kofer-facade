import { BusinessMetadata } from './business-metadata';

export class ModelMetadata {
    public _id: string;
    public name: string;
    public latest_version: number;
    public business_metadata: BusinessMetadata;
    public server_metadata: any;

    constructor(_id: string, 
        name: string, 
        latest_version: number, 
        business_metatata: BusinessMetadata, 
        server_metadata: any) {
            this._id = _id;
            this.name = name;
            this.latest_version = latest_version;
            this.business_metadata = business_metatata;
            this.server_metadata = server_metadata;
        }

    public static fromJson(obj: any): ModelMetadata {
        return new ModelMetadata(
            obj._id, 
            obj.name, 
            obj.latest_version, 
            BusinessMetadata.fromJson(obj.business_metadata), 
            obj.server_metadata);
    }

    public static createBlank(): ModelMetadata {
        return new ModelMetadata('abc1', 'fake-model', 6, BusinessMetadata.createBlank(), {});
    }
}