import { React, useState } from "react";
import { useParams } from "react-router-dom";

import { AppConfig } from "../App/AppConfig";

import { GermplasmListPagePresenter } from "../Presenter/GermplasmListPagePresenter";
import { GermplasmListPage } from "./GermplasmListPage/GermplasmListPage";
import { GermplasmListPageState as State } from "./GermplasmListPage/GermplasmListPageState";
import { GermplasmListPageEvent as Event } from "./GermplasmListPage/GermplasmListPageEvent";

import { ColdroomRepository } from "../Repository/ColdroomRepository";
import { GermplasmRepository } from "../Repository/GermplasmRepository";

const ColdroomPage = () => {
  const pageTitle = "Coldroom Storage";
  const { id } = useParams();
  const [pageState, setPageState] = useState(new State.StartState());
  const coldroomRepository = new ColdroomRepository(AppConfig.BaseURL);
  const germplasmRepository = new GermplasmRepository(AppConfig.BaseURL);
  const loadingPresenter = new GermplasmListPagePresenter(
    pageTitle,
    id,
    [],
    true,
    false
  );
  const loadFailPresenter = new GermplasmListPagePresenter(
    pageTitle,
    id,
    [],
    false,
    true
  );

  const addEvent = async (event) => {
    handleEvent(event);
  };

  const handleEvent = async (event) => {
    if (event instanceof Event.StartEvent) {
      startEventToState();
    } else if (event instanceof Event.LoadDataEvent) {
      loadDataEventToState();
    } else if (event instanceof Event.LoadSuccessEvent) {
      loadSuccessEventToState(event);
    } else if (event instanceof Event.LoadFailEvent) {
      loadFailEventToState(event);
    } else if (event instanceof Event.AddGermplasmEvent) {
      addGermplasmEventToState(event);
    } else if (event instanceof Event.UpdateGermplasmEvent) {
      updateGermplasmEventToState(event);
    } else if (event instanceof Event.RemoveGermplasmEvent) {
      removeGermplasmEventToState(event);
    } else if (event instanceof Event.AddGermplasmAttributeEvent) {
      addGermplasmAttributeEventToState(event);
    } else if (event instanceof Event.RemoveGermplasmAttributeEvent) {
      removeGermplasmAttributeEventToState(event);
    } else {
      throw new Error(`Invalid Page Event ${event}`);
    }
  };

  const startEventToState = () => {
    addEvent(new Event.LoadDataEvent());
  };

  const loadDataEventToState = () => {
    loadData();

    setPageState(new State.LoadingState(loadingPresenter));
  };

  const loadSuccessEventToState = (event) => {
    setPageState(new State.LoadSuccessState(event.presenter));
  };

  const loadFailEventToState = (event) => {
    setPageState(new State.LoadFailState(loadFailPresenter, event.error));
  };

  const loadData = async () => {
    try {
      const coldroom = await coldroomRepository.getColdroom();

      const presenter = new GermplasmListPagePresenter(
        "Coldroom Storage",
        id,
        coldroom.germplasms
      );

      addEvent(new Event.LoadSuccessEvent(presenter));
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error.message));
    }
  };

  const addGermplasmEventToState = (event) => {
    addGermplasm(event.germplasm);

    setPageState(new State.LoadingState(loadingPresenter));
  };

  const addGermplasm = async (germplasm) => {
    try {
      await germplasmRepository.createGermplasm(
        germplasm.name,
        id,
        germplasm.attributes
      );

      addEvent(new Event.StartEvent());
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error.message));
    }
  };

  const updateGermplasmEventToState = (event) => {
    updateGermplasm(event.germplasm);

    setPageState(new State.LoadingState(loadingPresenter));
  };

  const updateGermplasm = async (germplasm) => {
    try {
      await germplasmRepository.updateGermplasm(
        germplasm.id,
        germplasm.name,
        id,
        germplasm.attributes
      );

      addEvent(new Event.StartEvent());
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error.message));
    }
  };

  const removeGermplasmEventToState = (event) => {
    removeGermplasm(event.id);

    setPageState(new State.LoadingState(loadingPresenter));
  };

  const removeGermplasm = async (id) => {
    try {
      await germplasmRepository.deleteGermplasm(id);

      addEvent(new Event.StartEvent());
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error.message));
    }
  };

  const addGermplasmAttributeEventToState = (event) => {
    const name = event.name;
    const type = event.type;

    addGermplasmAttribute(event.name, event.type);

    setPageState(new State.LoadingState(loadingPresenter));
  };

  const addGermplasmAttribute = async (name, type) => {
    try {
      await coldroomRepository.addGermplasmAttribute(name, type);

      addEvent(new Event.StartEvent());
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error.message));
    }
  };

  const removeGermplasmAttributeEventToState = (event) => {
    removeGermplasmAttribute(event.name);

    setPageState(new State.LoadingState(loadingPresenter));
  };

  const removeGermplasmAttribute = async (name) => {
    console.log(name);
    try {
      await coldroomRepository.removeGermplasmAttribute(name);

      addEvent(new Event.StartEvent());
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error.message));
    }
  };

  return <GermplasmListPage state={pageState} addEvent={addEvent} />;
};

export { ColdroomPage };
