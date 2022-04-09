class GermplasmListPageEvent {
  constructor() {
    this.LoadDataEvent = LoadDataEvent;
    this.LoadSuccessEvent = LoadSuccessEvent;
    this.LoadFailEvent = LoadFailEvent;
    this.MoveGermplasmEvent = MoveGermplasmEvent;
  }
}

class LoadDataEvent {}
class LoadSuccessEvent {
  constructor(presenter) {
    this.presenter = presenter;
  }
}
class LoadFailEvent {
  constructor(error) {
    this.error = error;
  }
}
class MoveGermplasmEvent {}

const pageEvent = new GermplasmListPageEvent();

export { pageEvent as GermplasmListPageEvent };
