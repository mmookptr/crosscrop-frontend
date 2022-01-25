import React from "react";

import { Typography } from "@mui/material";

import PageLayout from "../components/Layout";
import Datasheet from "../components/DatasheetLayout";

const ColdRoomStoragePage = () => {
	return (
		<PageLayout>
			<Typography display="block" variant="pageTitle" sx={{ marginLeft: "72px" , width: "100%"}}>Cold Room Storage</Typography>
			<Typography variant="pageSubTitle" sx={{ marginLeft: "72px" }}>All Germplasm</Typography>
			<Datasheet />
		</PageLayout>
	);
};

export default ColdRoomStoragePage;
