import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";

import { Box } from "@mui/system";

import { createNewRow } from "./Usecase";
import { AddRecordToolbarButton } from "./AddRecordToolbarButton";
import { AddColumnToolbarButton } from "./AddColumnToolbarButton";

const Toolbar = ({ apiRef, addColumn }) => {
  const toolbarButtonSx = {
    fontWeight: "bold",
    fontSize: 13,
  };

  return (
    <GridToolbarContainer
      sx={{
        margin: "0",
        padding: "4px 8px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <GridToolbarColumnsButton sx={toolbarButtonSx} />
        <GridToolbarFilterButton sx={toolbarButtonSx} />
        <GridToolbarDensitySelector sx={toolbarButtonSx} />
        <GridToolbarExport sx={toolbarButtonSx} />
      </Box>

      <Box sx={{ display: "flex" }}>
        <AddColumnToolbarButton sx={toolbarButtonSx} addColumn={addColumn} />

        <AddRecordToolbarButton
          sx={toolbarButtonSx}
          onClick={createNewRow(apiRef)}
        />
      </Box>
    </GridToolbarContainer>
  );
};

export { Toolbar };
