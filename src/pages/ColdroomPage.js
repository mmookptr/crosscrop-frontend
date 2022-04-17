import { React, useState } from "react";
import { useParams } from "react-router-dom";

import { AppConfig } from "../app/AppConfig";

import { GermplasmListPagePresenter } from "../presenters/GermplasmListPagePresenter";
import { GermplasmListPage } from "./germplasmListPage/GermplasmListPage";
import { GermplasmListPageState as State } from "./germplasmListPage/GermplasmListPageState";
import { GermplasmListPageEvent as Event } from "./germplasmListPage/GermplasmListPageEvent";

import { ColdroomRepository } from "../repositories/ColdroomRepository";

const ColdroomPage = () => {
  const pageTitle = "Coldroom Storage";
  const { id } = useParams();
  const [pageState, setPageState] = useState(new State.StartState());
  const repository = new ColdroomRepository(AppConfig.BaseURL);

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
    } else {
      throw new Error(`Invalid Page Event ${event}`);
    }
  };

  const startEventToState = () => {
    addEvent(new Event.LoadDataEvent());
  };

  const loadDataEventToState = () => {
    loadData();

    const presenter = new GermplasmListPagePresenter(
      pageTitle,
      id,
      [],
      true,
      false
    );

    setPageState(new State.LoadingState(presenter));
  };

  const loadSuccessEventToState = (event) => {
    setPageState(new State.LoadSuccessState(event.presenter));
  };

  const loadFailEventToState = (event) => {
    const presenter = new GermplasmListPagePresenter(
      pageTitle,
      id,
      [],
      false,
      true
    );

    setPageState(new State.LoadFailState(presenter, event.error));
  };

  const loadData = async () => {
    try {
      const coldroom = await repository.getColdroom();

      const presenter = new GermplasmListPagePresenter(
        "Coldroom Storage",
        id,
        coldroom.germplasms
      );

      setTimeout(() => {
        addEvent(new Event.LoadSuccessEvent(presenter));
      }, 1500);
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error.message));
    }
  };

  return <GermplasmListPage state={pageState} addEvent={addEvent} />;
};

export { ColdroomPage };
