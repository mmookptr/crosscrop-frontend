import { Row } from "./Row";
import { Column } from "./Column";
import { RowState } from "./RowState";

function getRow(id, values, apiRef) {
  const columns = __getColumns(apiRef);
  const columnNames = columns.map((x) => x.name);
  const isNew = Boolean(values.isNew);
  const state = values.__state;
  columnNames.forEach((key) => {
    if (values[key] === undefined) {
      values[key] = null;
    }
  });

  const row = new Row(columns, values, isNew, state);

  return row;
}

function __getColumns(apiRef) {
  const columns = apiRef.current
    .getAllColumns()
    .filter((x) => !["__check__", "actions"].includes(x.field))
    .map(({ field, type }) => new Column(field, type));

  return columns;
}

function startRowEditing(id, apiRef) {
  updateRowState(id, RowState.Editing, apiRef);
  apiRef.current.startRowEditMode({ id });
}

function stopRowEditing(id, apiRef, ignoreModifications = false) {
  apiRef.current.stopRowEditMode({
    id,
    ignoreModifications: ignoreModifications,
  });

  if (ignoreModifications) {
    updateRowState(id, RowState.Loaded, apiRef);
  } else {
    updateRowState(id, RowState.Loading, apiRef);
  }
}

const createNewRow = (apiRef) => () => {
  const id = "-";

  apiRef.current.updateRows([{ id, isNew: true }]);
  startRowEditing(id, apiRef);

  setTimeout(() => {
    apiRef.current.scrollToIndexes({
      rowIndex: apiRef.current.getRowsCount() - 1,
    });

    apiRef.current.setCellFocus(id, "name");
  });
};

function deleteRow(id, apiRef) {
  apiRef.current.updateRows([{ id, _action: "delete" }]);
}

function updateRowState(id, rowState, apiRef) {
  apiRef.current.updateRows([{ id, __state: rowState }]);
}

export {
  getRow,
  createNewRow,
  startRowEditing,
  stopRowEditing,
  deleteRow,
  updateRowState,
};
