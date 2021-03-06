import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AppConfig } from "../App/AppConfig";

import { GermplasmListPagePresenter } from "../Presenter/GermplasmListPagePresenter";
import { GermplasmListPage } from "./GermplasmListPage/GermplasmListPage";
import { GermplasmListPageState as State } from "./GermplasmListPage/GermplasmListPageState";
import { GermplasmListPageEvent as Event } from "./GermplasmListPage/GermplasmListPageEvent";

import { BreedingNurseryRepository } from "../Repository/BreedingNurseryRepository";
import { GermplasmRepository } from "../Repository/GermplasmRepository";

const BreedingNurseryPage = () => {
  const pageTitle = "Breeding Nursery";
  const { id } = useParams();
  const [pageState, setPageState] = useState(new State.StartState());
  const breedingNurseryRepository = new BreedingNurseryRepository(
    AppConfig.BaseURL
  );
  const germplasmRepository = new GermplasmRepository(AppConfig.BaseURL);
  const loadingPresenter = new GermplasmListPagePresenter(
    pageTitle,
    " ",
    [],
    true,
    false
  );
  const loadFailPresenter = new GermplasmListPagePresenter(
    pageTitle,
    " ",
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
      const breedingNursery =
        await breedingNurseryRepository.getBreedingNurseryById(parseInt(id));

      const presenter = new GermplasmListPagePresenter(
        "Breeding Nursery",
        breedingNursery.name,
        breedingNursery.germplasms
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
        parseInt(id) || undefined,
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
        germplasm.parseInt(id),
        germplasm.name,
        parseInt(id) || undefined,
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
      await germplasmRepository.deleteGermplasm(parseInt(id));

      addEvent(new Event.StartEvent());
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error.message));
    }
  };

  const addGermplasmAttributeEventToState = (event) => {
    const name = event.name;
    const type = event.type;

    addGermplasmAttribute(name, type);

    setPageState(new State.LoadingState(loadingPresenter));
  };

  const addGermplasmAttribute = async (name, type) => {
    try {
      await breedingNurseryRepository.addGermplasmAttribute(
        parseInt(id),
        name,
        type
      );

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
    try {
      await breedingNurseryRepository.removeGermplasmAttribute(
        parseInt(id),
        name
      );

      addEvent(new Event.StartEvent());
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error.message));
    }
  };

  useEffect(() => {
    addEvent(new Event.LoadDataEvent());
  }, [id]);

  return <GermplasmListPage state={pageState} addEvent={addEvent} />;
};

export { BreedingNurseryPage };
