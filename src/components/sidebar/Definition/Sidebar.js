import { React } from "react";
import { Link, useLocation } from "react-router-dom";

import List from "@mui/material/List";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { Box } from "@mui/system";

import MenuButtonPresenter from "../../../presenters/MenuButtonPresenter";
import MenuButton from "../common/MenuButton";

const presenters = [
	new MenuButtonPresenter("Cold Room Storage", "/cold-room-storage"),
	new MenuButtonPresenter("Breeding Nursery", "", [
		new MenuButtonPresenter("BNIWJD", "/breeding-nursery/BNIWJD"),
		new MenuButtonPresenter("BNXKIP", "/breeding-nursery/BNXKIP"),
	]),
	new MenuButtonPresenter("Crossing Block", "", [
		new MenuButtonPresenter("XB1101A", "/crossing-block/XB1101A"),
		new MenuButtonPresenter("XB1107A", "/crossing-block/XB1107A"),
	]),
	new MenuButtonPresenter("Yield Trial", "", [
		new MenuButtonPresenter("YT1123T", "/yield-trial/YT1123T"),
		new MenuButtonPresenter("YT1125P", "/yield-trial/YT1125P"),
	]),
];

const Sidebar = () => {
	const theme = useTheme();

	const location = useLocation().pathname;

	return (
		<List
			component="nav"
			style={{ background: theme.palette.background.sidebar }}
			sx={{ width: "250px", boxShadow: 10, padding: 0 }}
		>
			<Box sx={{ textAlign: "center", margin: "48px 0" }}>
				<Typography
					style={{
						background: theme.palette.background.sidebarTitle,
						backgroundClip: "text",
						WebkitBackgroundClip: "text",
						color: "transparent",
					}}
					variant="sidebarTitle"
					component= {Link}
					to= {"/"}
				>
					Cross Crop
				</Typography>
				<Typography>Let's Breed</Typography>
			</Box>

			{presenters.map((presenter) => (
				<MenuButton presenter={presenter} key={presenter.buttonText} currentLocation={{location}}/>
			))}
		</List>
	);
};

export default Sidebar;
