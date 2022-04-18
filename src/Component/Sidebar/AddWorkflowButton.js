import { useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";
import { Button } from "@mui/material";

import { AddWorkflowDialog } from "./AddWorkflowDialog";

const AddWorkflowButton = ({ loadWorkflow }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    loadWorkflow();
  };

  const season = useSelector((state) => state.season.currentSeason);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "32px 16px",
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
        Add Workflow
      </Button>
      {season !== null && (
        <AddWorkflowDialog
          open={open}
          onClose={handleClose}
          seasonId={season.id}
        />
      )}
    </Box>
  );
};

export { AddWorkflowButton };
