import { React } from "react";
import { Link, useLocation } from "react-router-dom";

import List from "@mui/material/List";
import { Typography, Button } from "@mui/material";
import { useTheme } from "@mui/system";
import { Box } from "@mui/system";
import Divider from "@mui/material/Divider";

import MenuButtonPresenter from "../../presenters/MenuButtonPresenter";
import MenuButton from "./MenuButton";

const presenters = [
  new MenuButtonPresenter("Dashboard", "/dashboard"),
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
      <Season />
      <Divider
        sx={{
          bgcolor: "white",
          height: "2px",
          margin: "16px 24px",
          border: "none",
          borderRadius: 16,
        }}
      />
      <MenuList />
    </Box>
  );
};

const Logo = () => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "center", margin: "48px 0 32px 0" }}>
      <Typography
        style={{
          background: theme.palette.background.sidebarTitle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
        variant="sidebarTitle"
        component={Link}
        to={"/"}
      >
        Cross Crop
      </Typography>
      <Typography>Let's Breed</Typography>
    </Box>
  );
};

const MenuList = () => {
  const location = useLocation().pathname;

  return (
    <List sx={{ flex: 1, overflow: "auto", padding: 0 }}>
      {presenters.map((presenter) => (
        <MenuButton
          presenter={presenter}
          key={presenter.buttonText}
          currentLocation={{ location }}
        />
      ))}
    </List>
  );
};

const Season = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "0 16px",
      }}
    >
      <Button
        sx={{
          width: "100%",
          borderRadius: 24,
          bgcolor: "background.menuButton",
          color: "black",
        }}
      >
        Year 2021 Season1
      </Button>
    </Box>
  );
};

export default Sidebar;
