import { useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";
import { Button } from "@mui/material";

import { SelectSeasonDialog } from "./SelectSeasonDialog";

const SelectSeasonButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const season = useSelector((state) => state.season.currentSeason);

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
        onClick={handleClickOpen}
      >
        {season !== null && season.name}
        {season === null && "Select Season"}
      </Button>
      <SelectSeasonDialog open={open} onClose={handleClose} />
    </Box>
  );
};

export { SelectSeasonButton };
