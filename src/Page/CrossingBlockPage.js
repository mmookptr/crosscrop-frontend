import { React, useState } from "react";
import { useParams } from "react-router-dom";

import { AppConfig } from "../App/AppConfig";

import { GermplasmListPagePresenter } from "../Presenter/GermplasmListPagePresenter";
import { GermplasmListPage } from "./GermplasmListPage/GermplasmListPage";
import { GermplasmListPageState as State } from "./GermplasmListPage/GermplasmListPageState";
import { GermplasmListPageEvent as Event } from "./GermplasmListPage/GermplasmListPageEvent";

import { CrossingBlockRepository } from "../Repository/CrossingBlockRepository";

const CrossingBlockPage = () => {
  const { id } = useParams();
  const [pageState, setPageState] = useState(new State.StartState());
  const repository = new CrossingBlockRepository(AppConfig.BaseURL);

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
      const coldroom = await repository.getCrossingBlockById(id);

      const presenter = new GermplasmListPagePresenter(
        "CrossingBlock Storage",
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

export { CrossingBlockPage };
