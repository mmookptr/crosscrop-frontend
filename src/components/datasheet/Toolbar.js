import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";

import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

import { createNewRow, createNewColumn } from "./Usecase";

const Toolbar = ({ apiRef, addNewColumn }) => {
  return (
    <GridToolbarContainer
      sx={{ margin: "8px", display: "flex", justifyContent: "space-between" }}
    >
      <Box>
        <GridToolbarColumnsButton
          sx={{
            color: "#f199af",
            fontWeight: "bold",
          }}
        />
        <GridToolbarFilterButton
          sx={{
            color: "#f199af",
            fontWeight: "bold",
          }}
        />
        <GridToolbarDensitySelector
          sx={{
            color: "#f199af",
            fontWeight: "bold",
          }}
        />
        <GridToolbarExport
          sx={{
            color: "#f199af",
            fontWeight: "bold",
          }}
        />
      </Box>

      <Button
        color="primary"
        sx={{
          color: "#f199af",
          fontWeight: "bold",
        }}
        startIcon={<AddIcon />}
        onClick={() => addNewColumn("test", "string")}
      >
        Add Column
      </Button>
      <Button
        color="primary"
        sx={{
          color: "#f199af",
          fontWeight: "bold",
        }}
        startIcon={<AddIcon />}
        onClick={createNewRow(apiRef)}
      >
        Add record
      </Button>
    </GridToolbarContainer>
  );
};

export { Toolbar };
