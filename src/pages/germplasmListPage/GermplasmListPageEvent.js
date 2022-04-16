class GermplasmListPageEvent {
  constructor() {
    this.StartEvent = StartEvent;
    this.LoadDataEvent = LoadDataEvent;
    this.LoadSuccessEvent = LoadSuccessEvent;
    this.LoadFailEvent = LoadFailEvent;
    this.CreateNewColumnEvent = CreateNewColumnEvent;
    this.MoveGermplasmEvent = MoveGermplasmEvent;
  }
}

class StartEvent {}
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
class CreateNewColumnEvent {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}
class MoveGermplasmEvent {}

const pageEvent = new GermplasmListPageEvent();

export { pageEvent as GermplasmListPageEvent };
