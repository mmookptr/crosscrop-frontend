import { useState } from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/system";
import { Button } from "@mui/material";

import { RemoveWorkflowDialog } from "./RemoveWorkflowDialog";

const RemoveWorkflowButton = ({ loadWorkflow }) => {
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
        margin: "0 16px 32px 16px",
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
        Remove Workflow
      </Button>
      {season !== null && (
        <RemoveWorkflowDialog
          open={open}
          onClose={handleClose}
          seasonId={season.id}
        />
      )}
    </Box>
  );
};

export { RemoveWorkflowButton };
