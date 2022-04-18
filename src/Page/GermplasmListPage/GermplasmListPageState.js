class GermplasmListPageState {
  constructor() {
    this.StartState = StartState;
    this.LoadingState = LoadingState;
    this.LoadSuccessState = LoadSuccessState;
    this.LoadFailState = LoadFailState;
  }
}

class StartState {}
class LoadingState {
  constructor(presenter) {
    this.presenter = presenter;
  }
}
class LoadSuccessState {
  constructor(presenter) {
    this.presenter = presenter;
  }
}
class LoadFailState {
  constructor(presenter) {
    this.presenter = presenter;
  }
}

const pageState = new GermplasmListPageState();

export { pageState as GermplasmListPageState };
