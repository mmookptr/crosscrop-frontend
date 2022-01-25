import MenuButton from "./MenuButton";

const SubMenuButton = ({ presenter }) => {
	return (
		<MenuButton
			presenter={presenter}
			sx={{
				borderRadius: 24,
				bgcolor: "background.subItemButton",
				margin: "0px 32px 16px 32px",
			}}
		/>
	);
};

export default SubMenuButton;
