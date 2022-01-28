import React from "react";

import { Box } from "@mui/system";
import { Typography, Button } from "@mui/material";

import Datasheet from "./Datasheet";

const Page = ({presenter}) => {
	return (
		<Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
			<Box sx={{ paddingLeft: "16px" }}>
				<Typography display="block" variant="pageTitle">
					{presenter.pageTitle}
				</Typography>
				<Typography variant="pageSubTitle">{presenter.pageSubTitle}</Typography>
			</Box>
			<Box sx={{ padding: "16px", display: "flex", justifyContent: "end"  }}>
				<Button 
					sx={{color: "#eabbc5", bgcolor: "#fffaf9", fontWeight: "bold", boxShadow: 10, borderRadius: "8px", "&:hover": {
						bgcolor: "##f0b9c7", color: "white"
					}}}
				>To Breeding
				</Button>
			</Box>
			<Datasheet rows={presenter.rows} columns={presenter.columns} />
		</Box>
	);
};

export default Page;
