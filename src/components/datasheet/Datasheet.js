import { React } from "react";
import { useDispatch } from "react-redux";

import { Box } from "@mui/system";
import { useGridApiRef, DataGridPro } from "@mui/x-data-grid-pro";

import { actionColumn } from "./ActionColumn";
import { Toolbar } from "./Toolbar";

import { ColumnOption } from "./ColumnOption";

import { getSelectedGermplasm } from "../../slices/germplasmSlice.js";
import { Germplasm } from "../../models/Germplasm";

import { getRow } from "./Usecase";

const Datasheet = ({
  presenter,
  isLoading,
  isError,
  addColumn,
  removeColumn,
  addRecord,
  updateRecord,
  removeRecord,
}) => {
  const apiRef = useGridApiRef();
  const dispatch = useDispatch();

  const baseColumn = [
    { field: "id", headerName: "ID", editable: false },
    { field: "name", headerName: "Name", editable: true },
  ];
  const columns = [...baseColumn, ...presenter.columns];

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
    console.log(params);
  };

  const processRowUpdate = (newRow) => {
    const row = getRow(newRow.id, newRow, apiRef);
    const germplasm = Germplasm.fromDatasheetRow(row);
    const isNew = germplasm.id === "-";
    console.log(germplasm);
    if (isNew) {
      addRecord(germplasm);
    } else {
      updateRecord(germplasm);
    }

    return newRow;
  };

  return (
    <Box sx={{ flex: 1 }}>
      <DataGridPro
        rows={presenter.rows}
        columns={[
          ...columns,
          actionColumn(apiRef, addRecord, updateRecord, removeRecord),
        ]}
        initialState={{
          pinnedColumns: {
            left: ["__check__", "id", "name"],
            right: ["actions"],
          },
        }}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(item) => {
          dispatch(getSelectedGermplasm(item));
        }}
        error={isError}
        loading={isLoading}
        sx={{
          borderRadius: "24px",
          bgcolor: "#ffffff",
          boxShadow: 10,
          padding: "8px",
        }}
        apiRef={apiRef}
        editMode="row"
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: Toolbar,
          ColumnMenu: ColumnOption(removeColumn),
        }}
        componentsProps={{
          toolbar: { apiRef, addColumn },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default Datasheet;
