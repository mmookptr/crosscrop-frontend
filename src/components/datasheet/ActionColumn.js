import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CircularProgress } from "@mui/material";

import {
  getRow,
  startRowEditing,
  stopRowEditing,
  deleteRow,
  updateRowState,
} from "./Usecase";
import { RowState } from "./RowState";

import { GridActionsCellItem } from "@mui/x-data-grid";

const actionColumn = (apiRef, addRecord, updateRecord, removeRecord) => {
  const handleEditClick = (id, apiRef) => (event) => {
    event.stopPropagation();

    startRowEditing(id, apiRef);
  };

  const handleSaveClick = (id) => async (event) => {
    event.stopPropagation();

    stopRowEditing(id, apiRef);
  };

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();

    updateRowState(id, RowState.Loading, apiRef);

    removeRecord(id);
  };

  const handleCancelClick = (id) => (event) => {
    event.stopPropagation();

    stopRowEditing(id, apiRef, true);

    const row = apiRef.current.getRow(id);
    if (row.isNew) {
      deleteRow(id, apiRef);
    }
  };

  return {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      const values = { ...apiRef.current.getRow(id) };
      const rowState = getRow(id, values, apiRef).state;

      switch (rowState) {
        case RowState.Loading:
          return [<CircularProgress size={24} />];
        case RowState.LoadSuccess:
          return [<CheckCircleIcon color="success" size={24} />];
        case RowState.LoadFail:
          return [<CancelIcon color="error" size={24} />];
        case RowState.Editing:
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id, apiRef, addRecord, updateRecord)}
              color="primary"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id, apiRef)}
              color="inherit"
            />,
          ];
        case RowState.Loaded:
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id, apiRef)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id, apiRef, removeRecord)}
              color="inherit"
            />,
          ];
      }
    },
  };
};

export { actionColumn };
