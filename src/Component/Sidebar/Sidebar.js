import { React } from "react";

import { useTheme } from "@mui/system";
import { Box } from "@mui/system";
import Divider from "@mui/material/Divider";

import MenuButtonPresenter from "../../Presenter/MenuButtonPresenter";

import { SelectSeasonButton } from "./SelectSeasonButton";
import { Logo } from "./Logo";
import { WorkflowList } from "./WorkflowList";

const presenters = [
  new MenuButtonPresenter("Dashboard", "/dashboard"),
  new MenuButtonPresenter("Cold Room Storage", "/coldroom"),
  new MenuButtonPresenter("Breeding Nursery", "", [
    new MenuButtonPresenter("BNIWJD", "/breedingnursery/BNIWJD"),
    new MenuButtonPresenter("BNXKIP", "/breedingnursery/BNXKIP"),
  ]),
  new MenuButtonPresenter("Crossing Block", "", [
    new MenuButtonPresenter("XB1101A", "/crossingblock/XB1101A"),
    new MenuButtonPresenter("XB1107A", "/crossingblock/XB1107A"),
  ]),
  new MenuButtonPresenter("Yield Trial", "", [
    new MenuButtonPresenter("YT1123T", "/yieldtrial/YT1123T"),
    new MenuButtonPresenter("YT1125P", "/yieldtrial/YT1125P"),
  ]),
];

const Sidebar = () => {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      style={{ background: theme.palette.background.sidebar }}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "240px",
        boxShadow: 10,
        padding: 0,
      }}
    >
      <Logo />
      <SelectSeasonButton />
      <Divider
        sx={{
          bgcolor: "white",
          height: "2px",
          margin: "16px 24px",
          border: "none",
          borderRadius: 16,
        }}
      />
      <WorkflowList presenters={presenters} />
    </Box>
  );
};

export default Sidebar;
