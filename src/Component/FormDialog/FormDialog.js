import { React, useEffect } from "react";

import { CircularProgress, Typography } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { Box } from "@mui/system";

import { FormDialogState as State } from "./FormDialogState";
import { FormDialogEvent as Event } from "./FormDialogEvent";

const FormDialog = ({ open, onClose, title, sx, state, addEvent }) => {
  useEffect(() => {
    if (state instanceof State.StartState) {
      addEvent(new Event.StartEvent());
    }
  });

  return (
    <Dialog
      PaperProps={{
        style: { borderRadius: "24px" },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={sx}>{render(state)}</Box>
      </DialogContent>
    </Dialog>
  );
};

const render = (state) => {
  if (state instanceof State.StartState) {
    return <Box></Box>;
  } else if (state instanceof State.LoadingState) {
    return <LoadingDialog />;
  } else if (state instanceof State.LoadSuccessState) {
    return <LoadedDialog Content={state.content} />;
  } else if (state instanceof State.LoadFailState) {
    return <LoadFailDialog error={state.error} />;
  }

  return <LoadFailDialog error={state.error} />;
};

const LoadedDialog = ({ Content }) => {
  return <Content />;
};

const LoadingDialog = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

const LoadFailDialog = ({ error }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>an error occurred: {error}</Typography>
    </Box>
  );
};

export { FormDialog };
