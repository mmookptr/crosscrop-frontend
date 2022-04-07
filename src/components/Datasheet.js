import React from "react";
import {useDispatch} from "react-redux";

import { Box } from "@mui/system";
import {
	DataGrid,
	GridToolbarColumnsButton,
	GridToolbarContainer,
} from "@mui/x-data-grid";
import { getSelectedGermplasm } from "../slices/germplasmSlice.js"

const Datasheet = ({ rows, columns }) => {
	const dispatch = useDispatch()
	const toolbar = () => {
		return (
			<GridToolbarContainer sx={{ margin: "8px" }}>
				<GridToolbarColumnsButton
					sx={{ color: "#f199af", fontWeight: "bold" }}
				/>
			</GridToolbarContainer>
		);
	};

	return (
		<Box sx={{ flex: 1 }}>
			<DataGrid
				rows={rows}
				columns={columns}
				checkboxSelection
				disableSelectionOnClick
				onSelectionModelChange={(item) => {
					dispatch(getSelectedGermplasm(item))
				}}
				sx={{ borderRadius: "24px", bgcolor: "#ffffff", boxShadow: 10 }}
				components={{
					Toolbar: toolbar,
				}}
			/>
		</Box>
	);
};

export default Datasheet;
