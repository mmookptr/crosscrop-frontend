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

const actionColumn = (apiRef, addEvent) => {
  return {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      const rowState = getRow(id, apiRef).state;

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
              onClick={handleSaveClick(id, apiRef, addEvent)}
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
              onClick={handleDeleteClick(id, apiRef)}
              color="inherit"
            />,
          ];
      }
    },
  };
};

const handleEditClick = (id, apiRef) => (event) => {
  event.stopPropagation();

  startRowEditing(id, apiRef);
};

const handleSaveClick = (id, apiRef, addEvent) => async (event) => {
  event.stopPropagation();

  stopRowEditing(id, apiRef);

  const row = getRow(id, apiRef);

  if (row.isNew) {
    createGermplasm();
    setTimeout(() => {
      onLoadSuccess(id, apiRef);
    }, 1500);
  } else {
    updateGermplasm();
    setTimeout(() => {
      onLoadFail(id, apiRef);
    }, 1500);
  }
};

const handleDeleteClick = (id, apiRef) => (event) => {
  event.stopPropagation();

  deleteRow(id, apiRef);
};

const handleCancelClick = (id, apiRef) => (event) => {
  event.stopPropagation();

  stopRowEditing(id, apiRef, true);

  const row = apiRef.current.getRow(id);
  if (row.isNew) {
    deleteRow(id, apiRef);
  }
};

function onLoadSuccess(id, apiRef) {
  updateRowState(id, RowState.LoadSuccess, apiRef);

  setTimeout(() => {
    updateRowState(id, RowState.Loaded, apiRef);
  }, 1500);
}

function onLoadFail(id, apiRef) {
  updateRowState(id, RowState.LoadFail, apiRef);

  setTimeout(() => {
    startRowEditing(id, apiRef);
  }, 1500);
}

function createGermplasm() {}
function updateGermplasm() {}

export { actionColumn };
