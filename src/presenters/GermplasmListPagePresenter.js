import _ from "lodash";

class GermplasmListPagePresenter {
  constructor(pageTitle, pageSubTitle, germplasms) {
    this.pageTitle = pageTitle;
    this.pageSubTitle = pageSubTitle;

    const { rows, columns } =
      this.createRowsAndColumnsFromGermplasms(germplasms);
    this.rows = rows;
    this.columns = columns;
  }

  createRowsAndColumnsFromGermplasms(germplasms) {
    return germplasms.reduce(
      (prev, germplasm) => {
        const row = {
          id: germplasm.id,
          name: germplasm.name,
          createdOn: germplasm.created,
          updatedOn: germplasm.name,
          ...germplasm.attributes,
        };
        const newRows = [...prev.rows, row];

        const columns = [
          { field: "id", headerName: "ID", editable: false },
          { field: "name", headerName: "Name", editable: false },
        ].concat(
          Object.keys(germplasm.attributes).map((key) => {
            return { field: key, editable: true };
          })
        );
        const newColumns = _.uniqWith([...prev.columns, ...columns], _.isEqual);

        return { rows: newRows, columns: newColumns };
      },
      { rows: [], columns: [] }
    );
  }
}

export { GermplasmListPagePresenter };
