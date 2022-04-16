import { React, useState } from "react";
import { useDispatch } from "react-redux";

import { Box } from "@mui/system";
import { useGridApiRef, DataGridPro } from "@mui/x-data-grid-pro";

import { actionColumn } from "./ActionColumn";
import { Toolbar } from "./Toolbar";

import { getSelectedGermplasm } from "../../slices/germplasmSlice.js";

const Datasheet = ({ presenter, isLoading, isError, addEvent }) => {
  const apiRef = useGridApiRef();
  const dispatch = useDispatch();
  const [columns, setColumnsState] = useState(presenter.columns);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const processRowUpdate = (newRow) => {
    return newRow;
  };

  const addNewColumn = (name, type) => {
    const newColumns = [...columns, { field: name, type: type }];

    setColumnsState(newColumns);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <DataGridPro
        rows={presenter.rows}
        columns={[...columns, actionColumn(apiRef, addEvent)]}
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
        }}
        componentsProps={{
          toolbar: { apiRef, addEvent },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default Datasheet;
