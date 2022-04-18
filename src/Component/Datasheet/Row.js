import _ from "lodash";

import { RowState } from "./RowState";

class Row {
  constructor(columns, values, isNew, state = RowState.Loaded) {
    if (columns === undefined) throw new Error("Row: columns===undefined");
    if (values === undefined) throw new Error("Row: values===undefined");
    if (isNew === undefined) throw new Error("Row: isNew===undefined");
    if (state === undefined) throw new Error("Row: state===undefined");

    const columnNames = columns.map((column) => column.name);
    const valuesKeys = Object.keys(values);

    if (state !== RowState.Editing || !isNew) {
      columnNames.forEach((name) => {
        if (!valuesKeys.includes(name)) {
          const msg = `Row id: ${values.id}. No corresponding values for columns ${name}`;
          throw new Error(msg);
        }
      });
    }

    this.columns = columns;
    this.values = values;
    this.isNew = isNew;
    this.state = state;
  }
}

export { Row };
