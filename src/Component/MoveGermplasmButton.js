import { React, useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";
import { Button } from "@mui/material";

import { MoveGermplasmDialog } from "./MoveGermplasmDialog";

const MoveGermplasmButton = () => {
  const season = useSelector((state) => state.season.currentSeason);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    if (season === null) {
      alert("Please select season.");
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ padding: "16px", display: "flex", justifyContent: "end" }}>
      <Button
        sx={{
          color: "#eabbc5",
          bgcolor: "#fffaf9",
          fontWeight: "bold",
          boxShadow: 10,
          borderRadius: "8px",
          "&:hover": { bgcolor: "#f0b9c7", color: "white" },
        }}
        onClick={handleClickOpen}
      >
        Move Germplasm
      </Button>
      {season !== null && (
        <MoveGermplasmDialog open={open} onClose={handleClose} />
      )}
    </Box>
  );
};

export { MoveGermplasmButton };
