class FormDialogEvent {
  constructor() {
    this.StartEvent = StartEvent;
    this.LoadDataEvent = LoadDataEvent;
    this.LoadSuccessEvent = LoadSuccessEvent;
    this.LoadFailEvent = LoadFailEvent;
    this.FormSubmitEvent = FormSubmitEvent;
    this.SubmitSuccessEvent = SubmitSuccessEvent;
    this.SubmitFailEvent = SubmitFailEvent;
  }
}

class StartEvent {}
class LoadDataEvent {}
class LoadSuccessEvent {
  constructor(content) {
    this.content = content;
  }
}
class LoadFailEvent {
  constructor(error) {
    this.error = error;
  }
}
class FormSubmitEvent {
  constructor(form) {
    this.form = form;
  }
}
class SubmitSuccessEvent {}
class SubmitFailEvent {
  constructor(error) {
    this.error = error;
  }
}

const pageEvent = new FormDialogEvent();

export { pageEvent as FormDialogEvent };
