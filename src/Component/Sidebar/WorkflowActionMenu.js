import { React, useState } from "react";

import { Box } from "@mui/system";
import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { AddWorkflowButton } from "./AddWorkflowButton";
import { RemoveWorkflowButton } from "./RemoveWorkflowButton";

const WorkflowActionMenu = ({ seasonId, loadWorkflow }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <ListItemButton
        sx={{
          borderRadius: 24,
          bgcolor: "background.menuButton",
          margin: "0 16px 16px 16px",
        }}
        onClick={handleClick}
      >
        <ListItemText primary="Workflow Actions" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open}>
        <AddWorkflowButton seasonId={seasonId} loadWorkflow={loadWorkflow} />
        <RemoveWorkflowButton seasonId={seasonId} loadWorkflow={loadWorkflow} />
      </Collapse>
    </Box>
  );
};

export { WorkflowActionMenu };
