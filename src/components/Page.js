import React from "react";

import { Box } from "@mui/system";

import Sidebar from "./sidebar/definition/Sidebar";

const Page = ({ children }) => {
	return (
		<Box sx={{ display: "flex", height: "100%" }}>
			<Sidebar />
			<Box sx={{ margin: 0, flex: "auto", padding: "64px" }}>{children}</Box>
		</Box>
	);
};

export default Page;
