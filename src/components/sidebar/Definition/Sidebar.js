import { React } from "react";

import List from "@mui/material/List";
import { useTheme } from "@mui/system";
import { Box } from "@mui/system";

import "../../../css/Sidebar.css";

import MenuButtonPresenter from "../../../presenters/MenuButtonPresenter";
import MenuButton from "../Common/MenuButton";

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
		new MenuButtonPresenter("YT1125P", "/yield-tria/YT1125P"),
	]),
];

const Sidebar = () => {
	const theme = useTheme();

	return (
		<List
			component="nav"
			style={{ background: theme.palette.background.sidebar }}
			sx={{width: "250px", boxShadow: 10}}
		>
			<Box className="SidebarHeader">
				<h1 className="title">Cross Crop</h1>
				<p className="subTitle"> let's breed</p>
			</Box>

			{presenters.map((presenter) => (
				<MenuButton presenter={presenter} key={presenter.buttonText} />
			))}
		</List>
	);
};

export default Sidebar;
