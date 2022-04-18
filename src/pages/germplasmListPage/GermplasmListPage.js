import { React, useEffect } from "react";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import Datasheet from "../../components/datasheet/Datasheet";
import { MoveGermplasmButton } from "../../components/MoveGermplasmButton";
import { GermplasmListPageState as State } from "./GermplasmListPageState";
import { GermplasmListPageEvent as Event } from "./GermplasmListPageEvent";

const GermplasmListPage = ({ state, addEvent }) => {
  useEffect(() => {
    if (state instanceof State.StartState) {
      addEvent(new Event.StartEvent());
    }
  });

  const addColumn = (name, type) => {
    addEvent(new Event.AddGermplasmAttributeEvent(name, type));
  };

  const removeColumn = (name) => {
    addEvent(new Event.RemoveGermplasmAttributeEvent(name));
  };

  const addRecord = (germplasm) => {
    addEvent(new Event.AddGermplasmEvent(germplasm));
  };

  const updateRecord = (germplasm) => {
    addEvent(new Event.UpdateGermplasmEvent(germplasm));
  };

  const removeRecord = (germplasmId) => {
    addEvent(new Event.RemoveGermplasmEvent(germplasmId));
  };

  const LoadingPage = ({ presenter }) => {
    return <PageContent presenter={presenter} isLoading={true} />;
  };

  const LoadedPage = ({ presenter }) => {
    return (
      <PageContent
        presenter={presenter}
        addColumn={addColumn}
        removeColumn={removeColumn}
        addRecord={addRecord}
        updateRecord={updateRecord}
        removeRecord={removeRecord}
      />
    );
  };

  const LoadFailPage = ({ presenter }) => {
    return <PageContent presenter={presenter} isError={true} />;
  };

  const PageContent = ({
    presenter,
    isLoading,
    isError,
    addColumn,
    removeColumn,
    addRecord,
    updateRecord,
    removeRecord,
  }) => {
    return (
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ paddingLeft: "16px", marginTop: "17px" }}>
          <Typography display="block" variant="pageTitle">
            {presenter.pageTitle}
          </Typography>
          <Typography variant="pageSubTitle">
            {presenter.pageSubTitle}
          </Typography>
        </Box>
        <MoveGermplasmButton />
        <Datasheet
          presenter={presenter}
          isError={isError}
          isLoading={isLoading}
          addColumn={addColumn}
          removeColumn={removeColumn}
          addRecord={addRecord}
          updateRecord={updateRecord}
          removeRecord={removeRecord}
        />
      </Box>
    );
  };

  if (state instanceof State.StartState) {
    return <Box></Box>;
  } else if (state instanceof State.LoadingState) {
    return <LoadingPage presenter={state.presenter} />;
  } else if (state instanceof State.LoadSuccessState) {
    return <LoadedPage presenter={state.presenter} />;
  } else if (state instanceof State.LoadFailState) {
    return <LoadFailPage presenter={state.presenter} />;
  }
  return <LoadFailPage presenter={state.presenter} />;
};

export { GermplasmListPage };
