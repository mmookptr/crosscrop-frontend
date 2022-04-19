import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { useTheme } from "@mui/system";
import { Box } from "@mui/system";
import Divider from "@mui/material/Divider";

import MenuButtonPresenter from "../../Presenter/MenuButtonPresenter";

import { SelectSeasonButton } from "./SelectSeasonButton";
import { AddWorkflowButton } from "./AddWorkflowButton";
import { Logo } from "./Logo";
import { WorkflowList } from "./WorkflowList";

import { AppConfig } from "../../App/AppConfig";

import { BreedingNurseryRepository } from "../../Repository/BreedingNurseryRepository";
import { CrossingBlockRepository } from "../../Repository/CrossingBlockRepository";
import { YieldTrialRepository } from "../../Repository/YieldTrialRepository";
import { WorkflowType } from "../../Model/WorkflowType";
import { RemoveWorkflowButton } from "./RemoveWorkflowButton";
import { WorkflowActionMenu } from "./WorkflowActionMenu";

const Sidebar = () => {
  const theme = useTheme();
  const basePresenters = [
    new MenuButtonPresenter("Dashboard", "/dashboard"),
    new MenuButtonPresenter("Cold Room Storage", "/coldroom"),
  ];
  const [state, setState] = useState({
    presenters: basePresenters,
    isLoaded: false,
    seasonId: null,
    isOpen: false,
  });

  const season = useSelector((state) => state.season.currentSeason);

  if (season !== null && !state.isLoaded) {
    loadWorkflow(season.id);
  } else if (season !== null && state.seasonId !== season.id) {
    loadWorkflow(season.id);
  }

  const openDialog = () => {
    setState({ ...state, isOpen: true });
  };

  const closeDialog = () => {
    setState({ ...state, isOpen: false });
  };

  async function loadWorkflow(seasonId) {
    setState({
      ...state,
      seasonId: seasonId,
      isLoaded: true,
      presenters: [
        ...basePresenters,
        await loadBreedingNurseries(seasonId),
        await loadCrossingBlock(seasonId),
        await loadYieldTrial(seasonId),
      ],
    });
  }

  async function loadBreedingNurseries(seasonId) {
    const repository = new BreedingNurseryRepository(AppConfig.BaseURL);
    const breedingNurseries = await repository.getBreedingNurseriesBySeasonId(
      seasonId
    );

    const presenter = new MenuButtonPresenter(
      "Breeding Nursery",
      "",
      breedingNurseries.map((breedingNursery) => {
        return new MenuButtonPresenter(
          breedingNursery.name,
          `/breedingnursery/${breedingNursery.id}`
        );
      }),
      true,
      WorkflowType.BreedingNursery,
      seasonId,
      state.isOpen,
      openDialog,
      closeDialog
    );

    return presenter;
  }

  async function loadCrossingBlock(seasonId) {
    const repository = new CrossingBlockRepository(AppConfig.BaseURL);
    const crossingBlocks = await repository.getCrossingBlocksBySeasonId(
      seasonId
    );

    const presenter = new MenuButtonPresenter(
      "Crossing Block",
      "",
      crossingBlocks.map((crossingBlock) => {
        return new MenuButtonPresenter(
          crossingBlock.name,
          `/crossingblock/${crossingBlock.id}`
        );
      }),
      true,
      WorkflowType.CrossingBlock,
      seasonId
    );

    return presenter;
  }

  async function loadYieldTrial(seasonId) {
    const repository = new YieldTrialRepository(AppConfig.BaseURL);
    const yieldTrials = await repository.getYieldTrialsBySeasonId(seasonId);

    const presenter = new MenuButtonPresenter(
      "Yield Trial",
      "",
      yieldTrials.map((yieldTrial) => {
        return new MenuButtonPresenter(
          yieldTrial.name,
          `/yieldtrial/${yieldTrial.id}`
        );
      }),
      true,
      WorkflowType.YieldTrial,
      seasonId
    );

    return presenter;
  }

  const SidebarDivider = ({ sx }) => {
    return (
      <Divider
        sx={
          sx !== undefined
            ? sx
            : {
                bgcolor: "white",
                height: "2px",
                margin: "16px 24px",
                border: "none",
                borderRadius: 16,
              }
        }
      />
    );
  };

  return (
    <Box
      component="nav"
      style={{ background: theme.palette.background.sidebar }}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "240px",
        boxShadow: 10,
        padding: 0,
      }}
    >
      <Logo />
      <SelectSeasonButton />
      <SidebarDivider />
      <WorkflowList presenters={state.presenters} />
      {season !== null && (
        <>
          <SidebarDivider
            sx={{
              bgcolor: "white",
              height: "2px",
              margin: "0 24px 16px 24px",
              border: "none",
              borderRadius: 16,
            }}
          />
          <WorkflowActionMenu
            seasonId={season.id}
            loadWorkflow={loadWorkflow}
          />
        </>
      )}
    </Box>
  );
};

export default Sidebar;
