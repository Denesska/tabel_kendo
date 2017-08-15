export class Task {
    id: number;
    version: number;
    fieldValues: {
        Details: string,
        Description: string,
        Startdate: Date,
        Enddate: Date,
        Prioritate: string,
        Tip: string,
        Responsabil: number,
        Createdby: number,
        Zileestimate: number,
        Releaseversion: string
    };
    parentDocumentIds: Array<number>;
    documentTypeId: number;
}

export enum PriorityEnum {
    "4 - Mica",
    "3 - Medie",
    "2 - Mare",
    "1 - Foarte Mare"
}

export enum TaskType {
    "Request",
    "Change Request",
    "Feature Request",
    "Missing Feature",
    "Bug",
    "Internal Bug",
    "Idea",
    "Maintenance"
}