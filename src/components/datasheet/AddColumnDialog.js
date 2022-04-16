import { React, useState } from "react";

import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const AddColumnDialog = ({ open, onClose }) => {
  const [columnInfo, setColumnInfo] = useState({ name: "", type: "" });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Create Column"}</DialogTitle>
      <DialogContent>todo</DialogContent>
    </Dialog>
  );
};

export { AddColumnDialog };
