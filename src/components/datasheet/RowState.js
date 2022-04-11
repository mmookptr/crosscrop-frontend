class RowState {
  constructor() {
    this.Editing = "Editing";
    this.Loading = "Loading";
    this.Loaded = "Loaded";
    this.LoadSuccess = "LoadSuccess";
    this.LoadFail = "LoadFail";
  }
}

const rowState = new RowState();

export { rowState as RowState };
