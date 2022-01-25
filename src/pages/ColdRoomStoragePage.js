import React from "react";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import PageLayout from "../components/Page";
import Datasheet from "../components/Datasheet";

const ColdRoomStoragePage = () => {
	return (
		<PageLayout>
			<Box sx={{ paddingLeft: "16px" }}>
				<Typography display="block" variant="pageTitle">
					Cold Room Storage
				</Typography>
				<Typography variant="pageSubTitle">All Germplasm</Typography>
			</Box>
			<Datasheet />
		</PageLayout>
	);
};

export default ColdRoomStoragePage;
