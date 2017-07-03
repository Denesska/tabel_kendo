define(["require", "exports", "./test"], function (require, exports, test_1) {
    "use strict";
    exports.__esModule = true;
    var sections = test_1["default"].Sections;
    var markers = new Array();
    for (var _i = 0, sections_1 = sections; _i < sections_1.length; _i++) {
        var section = sections_1[_i];
        markers = markers.concat(section.Markers);
    }
    $("#grid").kendoGrid({
        dataSource: markers.filter(function (m) { return m.MarkerType === "destination"; }),
        height: 543,
        scrollable: true,
        sortable: true,
        resizable: true,
        batch: true,
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
            { field: "Description", title: "Marker Description", width: 500 }
        ],
        filterable: {
            messages: {
                search: "Search type"
            }
        }
    });
});
//# sourceMappingURL=script.js.map