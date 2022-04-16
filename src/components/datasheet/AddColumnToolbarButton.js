import { React, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import { Button } from "@mui/material";

import { AddColumnDialog } from "./AddColumnDialog";

const AddColumnToolbarButton = ({ sx, addEvent }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        color="primary"
        sx={sx}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        {"Add Column"}
      </Button>
      <AddColumnDialog open={open} onClose={handleClose} addEvent={addEvent} />
    </Box>
  );
};

export { AddColumnToolbarButton };
