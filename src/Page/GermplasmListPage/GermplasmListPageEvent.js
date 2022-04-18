class GermplasmListPageEvent {
  constructor() {
    this.StartEvent = StartEvent;
    this.LoadDataEvent = LoadDataEvent;
    this.LoadSuccessEvent = LoadSuccessEvent;
    this.LoadFailEvent = LoadFailEvent;
    this.AddGermplasmEvent = AddGermplasmEvent;
    this.UpdateGermplasmEvent = UpdateGermplasmEvent;
    this.RemoveGermplasmEvent = RemoveGermplasmEvent;
    this.AddGermplasmAttributeEvent = AddGermplasmAttributeEvent;
    this.RemoveGermplasmAttributeEvent = RemoveGermplasmAttributeEvent;
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
class AddGermplasmAttributeEvent {
  constructor(name, type) {
    if (name === undefined)
      throw new Error("addGermplasmAttributeEvent name: undefined");
    if (type === undefined)
      throw new Error("addGermplasmAttributeEvent type: undefined");

    this.name = name;
    this.type = type;
  }
}
class RemoveGermplasmAttributeEvent {
  constructor(name) {
    if (name === undefined)
      throw new Error("RemoveGermplasmAttributeEvent name: undefined");

    this.name = name;
  }
}
class AddGermplasmEvent {
  constructor(germplasm) {
    if (germplasm === undefined)
      throw new Error("AddGermplasmEvent germplasm: undefined");

    this.germplasm = germplasm;
  }
}
class RemoveGermplasmEvent {
  constructor(id) {
    if (id === undefined) throw new Error("RemoveGermplasmEvent id: undefined");

    this.id = id;
  }
}
class UpdateGermplasmEvent {
  constructor(germplasm) {
    if (germplasm === undefined)
      throw new Error("UpdateGermplasmEvent germplasm: undefined");

    this.germplasm = germplasm;
  }
}
class MoveGermplasmEvent {
  constructor(germplasmIds, workflowId) {
    if (germplasmIds === undefined)
      throw new Error("MoveGermplasmEvent germplasmIds: undefined");

    this.germplasmIds = germplasmIds;
    this.workflowId = workflowId;
  }
}

const pageEvent = new GermplasmListPageEvent();

export { pageEvent as GermplasmListPageEvent };
