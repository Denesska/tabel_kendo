
import response from "../jsons/res";

//var dataSource = new (kendo as any).data.DataSource({
//       schema: {
//        data: "container[0].items"
//    }
//});

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

/*
let dataSource = new kendo.data.DataSource({
    transport: {
        read:  {
            url: crudServiceBaseUrl + "/Products",
            dataType: "jsonp"
        },
        update: {
            url: crudServiceBaseUrl + "/Products/Update",
            dataType: "jsonp"
        },
        destroy: {
            url: crudServiceBaseUrl + "/Products/Destroy",
            dataType: "jsonp"
        },
        create: {
            url: crudServiceBaseUrl + "/Products/Create",
            dataType: "jsonp"
        },
        parameterMap: function(options, operation) {
            if (operation !== "read" && options.models) {
                return {models: kendo.stringify(options.models)};
            }
        }
    }});
*/

($("#grid") as any).kendoGrid({
    dataSource: /*dataSource,*/ markers.filter(m => m.MarkerType === "destination"),
    height: 543,
    scrollable: true,
    sortable: true,
    resizable: true,
    toolbar: ["create"],
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
        {field: "Description", title: "Marker Description", width: 500},
        { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }
    ],
    filterable: {
        messages: {
            search: "Search type"
        }
    },
    editable: "inline",
    detailTemplate: "<div>Event: # typeof Events === undefined ? 'N/A' : Events #</div>"
});
