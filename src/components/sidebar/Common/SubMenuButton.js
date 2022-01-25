import MenuButton from "./MenuButton";

const SubMenuButton = ({ presenter }) => {
	return (
		<MenuButton
			presenter={presenter}
			sx={{
				borderRadius: 24,
				bgcolor: "background.subItemButton",
				margin: "8px 24px 16px 24px",
			}}
		/>
	);
};

export default SubMenuButton;
