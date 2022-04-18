import { React, useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";
import { Button } from "@mui/material";

import { MoveGermplasmDialog } from "./MoveGermplasmDialog";

const MoveGermplasmButton = () => {
  const selectedGermplasm = useSelector((state) => state.germplasm.ids);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
      <MoveGermplasmDialog open={open} onClose={handleClose} />
    </Box>
  );
};

export { MoveGermplasmButton };
