import { React, useState } from "react";
import { useDispatch } from "react-redux";

import { Box } from "@mui/system";
import { useGridApiRef, DataGridPro } from "@mui/x-data-grid-pro";

import { rowAction } from "./RowAction";
import { Toolbar } from "./Toolbar";

import { getSelectedGermplasm } from "../../slices/germplasmSlice.js";

const Datasheet = ({ presenter }) => {
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
    console.log(columns);
    const newColumns = [...columns, { field: name, type: type }];
    console.log(newColumns);
    setColumnsState(newColumns);
  };

  return (
    <Box sx={{ flex: 1 }}>
      <DataGridPro
        rows={presenter.rows}
        columns={[...columns, rowAction(apiRef)]}
        initialState={{
          pinnedColumns: {
            right: ["actions"],
          },
        }}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(item) => {
          dispatch(getSelectedGermplasm(item));
        }}
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
          toolbar: { apiRef, addNewColumn },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
};

export default Datasheet;
