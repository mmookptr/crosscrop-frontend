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
        const attributes = germplasm.attributes.reduce((prev, attribute) => {
          const result = { ...prev };
          result[attribute.name] = attribute.value;
          return result;
        }, {});
        const row = {
          id: germplasm.id,
          name: germplasm.name,
          createdOn: germplasm.createdOn,
          updatedOn: germplasm.updatedOn,
          ...attributes,
        };

        const newRows = [...prev.rows, row];

        const columns = [
          { field: "id", headerName: "ID", editable: false },
          { field: "name", headerName: "Name", editable: true },
        ].concat(
          germplasm.attributes.map((attribute) => {
            return {
              field: attribute.name,
              type: attribute.type,
              editable: true,
            };
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
