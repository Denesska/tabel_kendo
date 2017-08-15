export class OcpDocument {
    Id: number;
    Title: string;
    DocumentTypeId: number;
    IconTextId: string;
    ParentDocumentIds: string[];
    StateMachineData: Object;
    NumberOfChildrenInTree: number;
    NumberOfChildrenInList: number;
}