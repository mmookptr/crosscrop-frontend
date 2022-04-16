import { React, useEffect } from "react";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import Datasheet from "../../components/datasheet/Datasheet";
import MoveGermplasmButton from "../../components/MoveGermplasmButton";
import { GermplasmListPageState as State } from "./GermplasmListPageState";
import { GermplasmListPageEvent as Event } from "./GermplasmListPageEvent";

const GermplasmListPage = ({ state, addEvent }) => {
  useEffect(() => {
    if (state instanceof State.StartState) {
      addEvent(new Event.StartEvent());
    }
  });

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

const LoadingPage = ({ presenter }) => {
  return <PageContent presenter={presenter} isLoading={true} />;
};

const LoadedPage = ({ presenter }) => {
  return <PageContent presenter={presenter} />;
};

const LoadFailPage = ({ presenter }) => {
  return <PageContent presenter={presenter} isError={true} />;
};

const PageContent = ({ presenter, isLoading, isError, addEvent }) => {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ paddingLeft: "16px", marginTop: "17px" }}>
        <Typography display="block" variant="pageTitle">
          {presenter.pageTitle}
        </Typography>
        <Typography variant="pageSubTitle">{presenter.pageSubTitle}</Typography>
      </Box>
      <MoveGermplasmButton />
      <Datasheet
        presenter={presenter}
        isError={isError}
        isLoading={isLoading}
        addEvent={addEvent}
      />
    </Box>
  );
};

export { GermplasmListPage };