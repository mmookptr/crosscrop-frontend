class FormDialogState {
  constructor() {
    this.StartState = StartState;
    this.LoadingState = LoadingState;
    this.LoadSuccessState = LoadSuccessState;
    this.LoadFailState = LoadFailState;
  }
}

class StartState {}
class LoadingState {}
class LoadSuccessState {
  constructor(content) {
    this.content = content;
  }
}
class LoadFailState {
  constructor(error) {
    this.error = error;
  }
}

const dialogState = new FormDialogState();

export { dialogState as FormDialogState };
