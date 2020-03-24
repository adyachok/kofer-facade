import { RunnerFile } from './runner-file';

export class Runner {
    _id: string;
    createdAt: string;
    currentRevision: number;
    department: string;
    description: string;
    file: RunnerFile;
    name: string;
    updatedAt: string;

    constructor(
        _id: string,
        createdAt: string,
        currentRevision: number,
        department: string,
        description: string,
        file: RunnerFile,
        name: string,
        updatedAt: string
    ) {
        this._id = _id;
        this.createdAt = createdAt;
        this.currentRevision = currentRevision;
        this.department = department;
        this.description = description;
        this.file = file;
        this.name = name;
        this.updatedAt = updatedAt;
    }

    public static fromJson(obj) {
        return new Runner(obj._id, obj.createdAt, obj.currentRevision, obj.department, obj.description, obj.file, obj.name, obj.updatedAt);
    }

    public static createBlank() {
        return new Runner('123abc', '23-03-2020 15:43:21', 1, 'biopharma', 'Lorem ipsum ...', RunnerFile.createBlank(), 'fake-runner', '23-03-2020 15:43:21');
    }
}