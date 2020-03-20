import { BusinessMetadataData } from './business-metadata-data';

export class BusinessMetadata {
    data: BusinessMetadataData;

    constructor(data: BusinessMetadataData) {
        this.data = data;
    }

    public static fromJson(obj: any) : BusinessMetadata {
        return new BusinessMetadata(BusinessMetadataData.fromJson(obj.data));
    }

    public static createBlank() : BusinessMetadata {
        return new BusinessMetadata(BusinessMetadataData.createBlank());
    }
}