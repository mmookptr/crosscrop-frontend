import React from "react";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import Datasheet from "../components/Datasheet";

const ColdRoomStoragePage = () => {
	return (
		<Box sx={{ height: "800px" }}>
			<Box sx={{ paddingLeft: "16px" }}>
				<Typography display="block" variant="pageTitle">
					Cold Room Storage
				</Typography>
				<Typography variant="pageSubTitle">All Germplasm</Typography>
			</Box>
			<Datasheet />
		</Box>
	);
};

export default ColdRoomStoragePage;
