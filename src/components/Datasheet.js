import React from "react";

import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";

import { mockData } from "../data/mockData";

const getSelectedRowId = (ids) => {
	console.log(ids);
};
const Datasheet = ({rows, columns}) => {
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
