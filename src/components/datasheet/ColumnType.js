class ColumnType {
  constructor() {
    this.String = "string";
    this.Number = "number";
    this.Date = "date";
    this.Datetime = "dateTime";
    this.Boolean = "boolean";
  }
}

const columnType = new ColumnType();

export { columnType as ColumnType };
