import React from "react";
import { useDispatch } from "react-redux";

import { Box } from "@mui/system";
import {
	DataGridPro,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbar
} from '@mui/x-data-grid-pro';
import { getSelectedGermplasm } from "../slices/germplasmSlice.js"

const Datasheet = ({ rows, columns }) => {
	const dispatch = useDispatch()
	const toolbar = () => {
		return (
			<GridToolbarContainer sx={{ margin: "8px" }}>
				<GridToolbarColumnsButton
					sx={{
						color: "#f199af",
						fontWeight: "bold"
					}}
				/>
			</GridToolbarContainer>
		);
	};

	return (
		<Box sx={{ flex: 1 }}>
			<DataGridPro
				rows={rows}
				columns={columns}
				checkboxSelection
				disableSelectionOnClick
				onSelectionModelChange={(item) => {
					dispatch(getSelectedGermplasm(item))
				}}
				sx={{
					borderRadius: "24px",
					bgcolor: "#ffffff",
					boxShadow: 10,
					padding: "8px"
				}}
				components={{
					Toolbar: GridToolbar,
				}}
			/>
		</Box>
	);
};

export default Datasheet;
