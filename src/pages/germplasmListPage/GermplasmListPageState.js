class GermplasmListPageState {
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
  constructor(presenter) {
    this.presenter = presenter;
  }
}
class LoadFailState {
  constructor(error) {
    this.error = error;
  }
}

const pageState = new GermplasmListPageState();

export { pageState as GermplasmListPageState };
