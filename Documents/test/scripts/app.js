define(["require", "exports", "../jsons/res"], function (require, exports, res_1) {
    "use strict";
    exports.__esModule = true;
    var sections = res_1["default"].Sections;
    var markers = new Array();
    for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
        var section = sections_1[_i];
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
    $("#grid").kendoGrid({
        dataSource: /*dataSource,*/ markers.filter(function (m) { return m.MarkerType === "destination"; }),
        height: 543,
        scrollable: true,
        sortable: true,
        resizable: true,
        toolbar: ["create"],
        columns: [
            { field: "Id", title: "Marker ID" },
            { field: "MarkerNo", title: "Marker No" },
            { field: "Name", title: "Marker Name" },
            { field: "PosX", title: "Marker X" },
            { field: "PosY", title: "Marker Y" },
            { field: "MarkerType", title: "Marker Type", filterable: {
                    multi: true,
                    search: true
                } },
            { field: "Angle", title: "Marker Angle" },
            { field: "Description", title: "Marker Description", width: 500 },
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
});
//# sourceMappingURL=app.js.map