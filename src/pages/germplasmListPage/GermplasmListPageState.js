class GermplasmListPageState {
  constructor() {
    this.StartState = StartState;
    this.LoadingState = LoadingState;
    this.LoadSuccessState = LoadSuccessState;
    this.LoadFailedState = LoadFailedState;
  }
}

class StartState {}
class LoadingState {}
class LoadSuccessState {
  constructor(presenter) {
    this.presenter = presenter;
  }
}
class LoadFailedState {
  constructor(error) {
    this.error = error;
  }
}

const pageState = new GermplasmListPageState();

export { pageState as GermplasmListPageState };
