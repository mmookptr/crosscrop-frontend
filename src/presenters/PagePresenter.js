class PagePresenter {
  constructor(pageTitle, pageSubTitle, rows = [], columns = []) {
    this.pageTitle = pageTitle;
    this.pageSubTitle = pageSubTitle;
    this.rows = rows;
    this.columns = columns;
  }
}

export default PagePresenter;
