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
import { Germplasm } from "../../models/Germplasm";

const actionColumn = (apiRef, addRecord, updateRecord, removeRecord) => {
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

const handleEditClick = (id, apiRef) => (event) => {
  event.stopPropagation();

  startRowEditing(id, apiRef);
};

const handleSaveClick =
  (id, apiRef, addRecord, updateRecord) => async (event) => {
    event.stopPropagation();

    stopRowEditing(id, apiRef);

    const row = getRow(id, apiRef);
    console.log(Germplasm.fromDatasheetRow(row));
    if (row.isNew) {
      createGermplasm(addRecord);
      setTimeout(() => {
        onSaveSuccess(id, apiRef);
      }, 1500);
    } else {
      updateGermplasm(updateRecord);
      setTimeout(() => {
        onSaveFail(id, apiRef);
      }, 1500);
    }
  };

const handleDeleteClick = (id, apiRef, removeRecord) => (event) => {
  event.stopPropagation();

  updateRowState(id, RowState.Loading, apiRef);

  try {
    removeRecord(id);

    deleteRow(id, apiRef);
  } catch (error) {
    onDeleteFail(id, apiRef);
  }
};

const handleCancelClick = (id, apiRef) => (event) => {
  event.stopPropagation();

  stopRowEditing(id, apiRef, true);

  const row = apiRef.current.getRow(id);
  if (row.isNew) {
    deleteRow(id, apiRef);
  }
};

function onSaveSuccess(id, apiRef) {
  updateRowState(id, RowState.LoadSuccess, apiRef);

  setTimeout(() => {
    updateRowState(id, RowState.Loaded, apiRef);
  }, 1500);
}

function onSaveFail(id, apiRef) {
  updateRowState(id, RowState.LoadFail, apiRef);

  setTimeout(() => {
    startRowEditing(id, apiRef);
  }, 1500);
}

function onDeleteFail(id, apiRef) {
  updateRowState(id, RowState.LoadFail, apiRef);

  setTimeout(() => {
    updateRowState(id, RowState.Loaded, apiRef);
  }, 1500);
}

function createGermplasm(addRecord) {}
function updateGermplasm() {}

export { actionColumn };
