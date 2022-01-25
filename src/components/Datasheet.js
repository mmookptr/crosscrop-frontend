import React from "react";

import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

import { mockData } from "../mockData";

const columns = [
	{ field: "id", headerName: "ID" },
	{ field: "name", headerName: "Name" },
	{ field: "total", headerName: "Total", editable: true, type: "number" },
	{ field: "xlevel", headerName: "X-level", editable: true, type: "number" },
	{ field: "ylevel", headerName: "Y-level", editable: true, type: "number" },
	{ field: "zlevel", headerName: "Z-level", editable: true, type: "number" },
	{ field: "test1", headerName: "Test-1", editable: true },
	{ field: "test2", headerName: "Test-2", editable: true },
	{ field: "test3", headerName: "Test-3", editable: true },
	{ field: "abc_test", headerName: "ABC-Test", editable: true, type: "number" },
	{ field: "kfc_test", headerName: "KFC-Test", editable: true, type: "number" },
	{ field: "bgk_test", headerName: "BGK-Test", editable: true, type: "number" },
];

const rows = mockData;

const getSelectedRowId = (ids) => {
	console.log(ids);
};
const Datasheet = () => {
	return (
		<Box sx={{ height: "90%", paddingTop: "64px" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				checkboxSelection
				disableSelectionOnClick
				onSelectionModelChange={(item) => {
					getSelectedRowId(item);
				}}
				sx={{ borderRadius: "24px", bgcolor: "#ffffff", boxShadow: 10 }}
			/>
		</Box>
	);
};

export default Datasheet;
