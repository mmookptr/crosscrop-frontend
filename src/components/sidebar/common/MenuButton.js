import { React, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Box } from "@mui/system";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SubMenuButton from "./SubMenuButton";

const MenuButton = ({ presenter, sx }) => {
	const [open, setOpen] = useState(false);

	const location = useLocation().pathname;

	const hasSubMenu = presenter.subMenuButtonPresenters.length !== 0;

	const isCurrentLocation = location === presenter.toPath

	const handleClick = () => {
		setOpen(!open);
	};

	const fieldProp = {
		...(sx !== undefined
			? { sx: sx }
			: {
					sx: {
						borderRadius: 24,
						bgcolor: isCurrentLocation ? "background.activeMenuButton": "background.menuButton",
						margin: "16px",
					},
			  }),
		...(hasSubMenu && { onClick: handleClick }),
		...(hasSubMenu || { component: Link, to: presenter.toPath }),
	};

	return (
		<Box>
			<ListItemButton {...fieldProp}>
				<ListItemText primary={presenter.buttonText}/>

				{hasSubMenu && (open ? <ExpandLess /> : <ExpandMore />)}
			</ListItemButton>

			{hasSubMenu && (
				<Collapse in={open}>
					{presenter.subMenuButtonPresenters.map((subMenuPresenter) => {
						return <SubMenuButton presenter={subMenuPresenter} key={subMenuPresenter.buttonText}/>;
					})}
				</Collapse>
			)}
		</Box>
	);
};

export default MenuButton;
