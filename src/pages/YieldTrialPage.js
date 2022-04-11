import { React, useState } from "react";
import { useParams } from "react-router-dom";

import { AppConfig } from "../app/AppConfig";

import { GermplasmListPagePresenter } from "../presenters/GermplasmListPagePresenter";
import { GermplasmListPage } from "./germplasmListPage/GermplasmListPage";
import { GermplasmListPageState as State } from "./germplasmListPage/GermplasmListPageState";
import { GermplasmListPageEvent as Event } from "./germplasmListPage/GermplasmListPageEvent";

import { YieldTrialRepository } from "../repositories/YieldTrialRepository";

const YieldTrialPage = () => {
  const { id } = useParams();
  const [pageState, setPageState] = useState(new State.StartState());
  const repository = new YieldTrialRepository(AppConfig.BaseURL);

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
      setPageState(new State.LoadFailState(event.error));
    } else {
      console.log(`Invalid Event ${event}`);
    }
  };

  const loadData = async () => {
    try {
      const coldroom = await repository.getYieldTrialById(id);

      const presenter = new GermplasmListPagePresenter(
        "YieldTrial Storage",
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

export { YieldTrialPage };
