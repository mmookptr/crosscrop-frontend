import React from "react";

import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";

import Datasheet from "./Datasheet";
import MoveGermplasmButton from "./MoveGermplasmButton";

const Page = ({presenter}) => {
	return (
		<Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<Box sx={{ paddingLeft: "16px" }}>
				<Typography display="block" variant="pageTitle">
					{presenter.pageTitle}
				</Typography>
				<Typography variant="pageSubTitle">{presenter.pageSubTitle}</Typography>
			</Box>
			<MoveGermplasmButton/>
			<Datasheet rows={presenter.rows} columns={presenter.columns} />
		</Box>
	);
};

export default Page;
