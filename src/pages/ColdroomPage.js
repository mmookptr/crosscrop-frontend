import { React, useState } from "react";
import { useParams } from "react-router-dom";

import { AppConfig } from "../app/AppConfig";

import { GermplasmListPagePresenter } from "../presenters/GermplasmListPagePresenter";
import { GermplasmListPage } from "./germplasmListPage/GermplasmListPage";
import { GermplasmListPageState as State } from "./germplasmListPage/GermplasmListPageState";
import { GermplasmListPageEvent as Event } from "./germplasmListPage/GermplasmListPageEvent";

import { ColdroomRepository } from "../repositories/ColdroomRepository";

const ColdroomPage = () => {
  const { id } = useParams();
  const [pageState, setPageState] = useState(new State.StartState());
  const repository = new ColdroomRepository(AppConfig.BaseURL);

  const addEvent = async (event) => {
    handleEvent(event);
  };

  const handleEvent = async (event) => {
    if (event instanceof Event.LoadDataEvent) {
      loadData();

      setPageState(new State.LoadingState());
    } else if (event instanceof Event.LoadSuccessEvent) {
      setPageState(new State.LoadSuccessState(event.presenter));
    } else if (event instanceof Event.LoadFailEvent) {
      setPageState(new State.LoadFailedState(event.error));
    } else {
      console.log(`Invalid Event ${event}`);
    }
  };

  const loadData = async () => {
    try {
      const coldroom = await repository.getColdroom();

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

  return <GermplasmListPage state={pageState} addEvent={addEvent} />;
};

export { ColdroomPage };
