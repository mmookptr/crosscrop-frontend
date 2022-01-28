import React from "react";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import Datasheet from "./Datasheet";

const Page = ({presenter}) => {
	return (
		<Box sx={{ height: "800px" }}>
			<Box sx={{ paddingLeft: "16px" }}>
				<Typography display="block" variant="pageTitle">
					{presenter.pageTitle}
				</Typography>
				<Typography variant="pageSubTitle">
					{presenter.pageSubTitle}
				</Typography>
			</Box>
			<Datasheet rows={presenter.rows} columns={presenter.columns} />
		</Box>
	);
};

export default Page;
