import { React, useEffect } from "react";

import { Box } from "@mui/system";
import { Typography, CircularProgress } from "@mui/material";

import Datasheet from "../../components/datasheet/Datasheet";
import MoveGermplasmButton from "../../components/MoveGermplasmButton";
import { GermplasmListPageState as State } from "./GermplasmListPageState";
import { GermplasmListPageEvent as Event } from "./GermplasmListPageEvent";

const GermplasmListPage = ({ state, addEvent }) => {
  useEffect(() => {
    if (state instanceof State.StartState) {
      addEvent(new Event.LoadDataEvent());
    }
  });

  if (state instanceof State.StartState) {
    return <Box></Box>;
  } else if (state instanceof State.LoadingState) {
    return <LoadingPage />;
  } else if (state instanceof State.LoadSuccessState) {
    return <LoadedPage presenter={state.presenter} />;
  } else if (state instanceof State.LoadFailState) {
    return <LoadFailPage errorMessage={state.error} />;
  }
  return <LoadFailPage errorMessage={"Invalid Page State"} />;
};

const LoadingPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={56} />
    </Box>
  );
};

const LoadedPage = ({ presenter }) => {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ paddingLeft: "16px" }}>
        <Typography display="block" variant="pageTitle">
          {presenter.pageTitle}
        </Typography>
        <Typography variant="pageSubTitle">{presenter.pageSubTitle}</Typography>
      </Box>
      <MoveGermplasmButton />
      <Datasheet presenter={presenter} />
    </Box>
  );
};

const LoadFailPage = ({ errorMessage }) => {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ paddingLeft: "16px" }}>
        <Typography variant="pageTitle">Error Occurred</Typography>
        <br />
        <Typography variant="pageSubTitle">{errorMessage}</Typography>
      </Box>
    </Box>
  );
};

export { GermplasmListPage };
