import { MenuItem } from "@mui/material";
import {
  GridColumnMenuContainer,
  SortGridMenuItems,
} from "@mui/x-data-grid-pro";

const ColumnOption =
  (deleteColumn) =>
  ({ hideMenu, currentColumn }) => {
    const columnName = currentColumn.field;

    return (
      <GridColumnMenuContainer
        hideMenu={hideMenu}
        currentColumn={currentColumn}
      >
        <SortGridMenuItems onClick={hideMenu} column={currentColumn} />

        {!["__check__", "id", "name"].includes(columnName) && (
          <MenuItem color="inherit" onClick={() => deleteColumn(columnName)}>
            Delete
          </MenuItem>
        )}
      </GridColumnMenuContainer>
    );
  };

export { ColumnOption };
