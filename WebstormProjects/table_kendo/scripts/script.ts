/**
 * Created by d.gandzii on 7/3/2017.
 */
import response from "./test"

interface Marker {
    Id: number,
    MarkerNo: number,
    Name : string,
    PosX : number,
    PosY : number,
    MarkerType : string,
    Angle : number,
    Description?: string,
    Tags?: any,
    Events?: any
}

let sections = response.Sections;
let markers: Array<Marker> = new Array<Marker>();

for (let section of sections) {
    markers = markers.concat(section.Markers);
}


($("#grid") as any).kendoGrid({
    dataSource: markers.filter(m => m.MarkerType === "destination"),
    height: 543,
    scrollable: true,
    sortable: true,
    resizable: true,
    batch: true,
    columns: [
        {field: "Id", title: "Marker ID"},
        {field: "MarkerNo", title: "Marker No"},
        {field: "Name", title: "Marker Name"},
        {field: "PosX", title: "Marker X"},
        {field: "PosY", title: "Marker Y"},
        {field: "MarkerType", title: "Marker Type", filterable: {
            multi: true,
            search: true
        }},
        {field: "Angle", title: "Marker Angle"},
        {field: "Description", title: "Marker Description", width: 500}
    ],
    filterable: {
        messages: {
            search: "Search type"
        }
    }
});

