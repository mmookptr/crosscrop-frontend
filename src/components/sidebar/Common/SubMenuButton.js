import { useLocation } from "react-router-dom";
import MenuButton from "./MenuButton";

const SubMenuButton = ({ presenter }) => {
	const location = useLocation().pathname;
	const isCurrentLocation = location === presenter.toPath

	return (
		<MenuButton
			presenter={presenter}
			sx={{
				borderRadius: 24,
				bgcolor: isCurrentLocation ? "background.activeMenuButton": "background.menuButton",
				margin: "0px 32px 16px 32px",
			}}
		/>
	);
};

export default SubMenuButton;
