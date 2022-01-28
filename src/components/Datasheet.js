import React from "react";

import { Box } from "@mui/system";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer } from "@mui/x-data-grid";

const getSelectedRowId = (ids) => {
	console.log(ids);
};
const Datasheet = ({rows, columns}) => {

	const toolbar = () => {
		return ( 
			<GridToolbarContainer sx={{margin: "8px"}}>
				<GridToolbarColumnsButton sx={{color: "#f199af", fontWeight: "bold"}}/>
			</GridToolbarContainer>
		)
	}

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
				sx={{ borderRadius: "24px", bgcolor: "#ffffff", boxShadow: 10}}
				components={{
					Toolbar: toolbar
				}}
			/>
		</Box>
	);
};

export default Datasheet;
