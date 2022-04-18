import { React, useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@mui/material";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { FormDialogState as State } from "./FormDialog/FormDialogState";
import { FormDialogEvent as Event } from "./FormDialog/FormDialogEvent";
import { FormDialog } from "./FormDialog/FormDialog";

import { ColdroomRepository } from "../Repository/ColdroomRepository";
import { BreedingNurseryRepository } from "../Repository/BreedingNurseryRepository";
import { CrossingBlockRepository } from "../Repository/CrossingBlockRepository";
import { YieldTrialRepository } from "../Repository/YieldTrialRepository";
import { AppConfig } from "../App/AppConfig";
import { MoveGermplasmTargetType } from "./MoveGermplasmTargetType";

const MoveGermplasmDialog = ({ open, onClose, addColumn }) => {
  const [state, setState] = useState({
    dialogState: new State.StartState(),
    selectedWorkflowType: MoveGermplasmTargetType.Coldroom,
    workflows: [],
  });

  const season = useSelector((state) => state.season.currentSeason);
  const germplasmIds = useSelector((state) => state.germplasm.ids);

  const addEvent = async (event) => {
    handleEvent(event);
  };

  const handleEvent = async (event) => {
    if (event instanceof Event.StartEvent) {
      startEventToState();
    } else if (event instanceof Event.LoadSuccessEvent) {
      loadSuccessEventToState(event);
    } else if (event instanceof Event.LoadFailEvent) {
      loadFailEventToState(event);
    } else if (event instanceof Event.FormSubmitEvent) {
      formSubmitEventToState(event);
    } else {
      throw new Error(`Invalid Page Event ${event}`);
    }
  };

  const startEventToState = () => {
    const content = Content;

    addEvent(new Event.LoadSuccessEvent(content));
  };

  const loadSuccessEventToState = (event) => {
    setState({
      ...state,
      dialogState: new State.LoadSuccessState(event.content),
    });
  };

  const loadFailEventToState = (event) => {
    setState({
      ...state,
      dialogState: new State.LoadFailState(event.error),
    });
  };

  const formSubmitEventToState = (event) => {
    setState({
      ...state,
      dialogState: new State.LoadingState(),
    });

    const workflowId = event.form.workflowId;
    const workflowType = event.form.workflowType;
    const germplasmIds = event.form.germplasmIds;

    console.log(`id ${workflowId} type ${workflowType} ${germplasmIds}`);

    moveGermplasm(germplasmIds, workflowId, workflowType);
  };

  const loadWorkflows = async (type) => {
    try {
      if (season === null) {
        throw new Error("Season not selected");
      }

      if (type === MoveGermplasmTargetType.BreedingNursery) {
        const repository = new BreedingNurseryRepository(AppConfig.BaseURL);

        const breedingNurseries =
          await repository.getBreedingNurseriesBySeasonId(season.id);

        setState({
          ...state,
          selectedWorkflowType: type,
          workflows: breedingNurseries,
        });
      } else if (type === MoveGermplasmTargetType.CrossingBlock) {
        const repository = new CrossingBlockRepository(AppConfig.BaseURL);

        const crossingBlocks = await repository.getCrossingBlocksBySeasonId(
          season.id
        );

        setState({
          ...state,
          selectedWorkflowType: type,
          workflows: crossingBlocks,
        });
      } else if (type === MoveGermplasmTargetType.YieldTrial) {
        const repository = new YieldTrialRepository(AppConfig.BaseURL);

        const yieldTrials = await repository.getYieldTrialsBySeasonId(
          season.id
        );

        setState({
          ...state,
          selectedWorkflowType: type,
          workflows: yieldTrials,
        });
      } else {
        throw new Error("loadworkflow workflow invalid workflowType");
      }
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error.message));
    }
  };

  const moveGermplasm = async (germplasmIds, workflowId, type) => {
    try {
      setState({
        ...state,
        selectedWorkflowType: type,
        dialogState: new State.LoadingState(),
      });

      if (season === null) {
        throw new Error("Season not selected");
      }

      if (type === MoveGermplasmTargetType.Coldroom) {
        const repository = new ColdroomRepository(AppConfig.BaseURL);

        await repository.addGermplasm(germplasmIds);
      } else if (type === MoveGermplasmTargetType.BreedingNursery) {
        const repository = new BreedingNurseryRepository(AppConfig.BaseURL);

        await repository.addGermplasm(workflowId, germplasmIds);
      } else if (type === MoveGermplasmTargetType.CrossingBlock) {
        const repository = new CrossingBlockRepository(AppConfig.BaseURL);

        await repository.addGermplasm(workflowId, germplasmIds);
      } else if (type === MoveGermplasmTargetType.YieldTrial) {
        const repository = new YieldTrialRepository(AppConfig.BaseURL);

        await repository.addGermplasm(workflowId, germplasmIds);
      } else {
        throw new Error("loadworkflow workflow invalid workflowType");
      }

      addEvent(new Event.StartEvent());

      onClose();
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error.message));
    }
  };

  const Content = () => {
    return (
      <form>
        <SelectWorkflowType />
        <SelectWorkflow workflows={state.workflows} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "16px",
            justifyContent: "flex-end",
          }}
        >
          <Button color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="button"
            onClick={(event) => {
              const form = event.target.form;

              if (form.reportValidity()) {
                const workflowType = form.workflowType.value;
                const workflowId = form.workflowId.value;

                const moveGermplasmForm = {
                  germplasmIds: germplasmIds,
                  workflowType: workflowType,
                  workflowId: workflowId,
                };

                addEvent(new Event.FormSubmitEvent(moveGermplasmForm));
              }
            }}
          >
            Move
          </Button>
        </Box>
      </form>
    );
  };

  const SelectWorkflowType = () => {
    const moveGermplasmTargets = [
      {
        value: MoveGermplasmTargetType.Coldroom,
        label: MoveGermplasmTargetType.Coldroom,
      },
      {
        value: MoveGermplasmTargetType.BreedingNursery,
        label: MoveGermplasmTargetType.BreedingNursery,
      },
      {
        value: MoveGermplasmTargetType.CrossingBlock,
        label: MoveGermplasmTargetType.CrossingBlock,
      },
      {
        value: MoveGermplasmTargetType.YieldTrial,
        label: MoveGermplasmTargetType.YieldTrial,
      },
    ];

    const handleChange = (event) => {
      const workflowType = event.target.value;

      setState({ ...state, selectedWorkflowType: workflowType });
      loadWorkflows(workflowType);
    };

    return (
      <FormControl sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="workflow-type">Workflow Type</InputLabel>
        <Select
          labelId="workflow-type"
          id="workflow-type"
          value={state.selectedWorkflowType}
          onChange={handleChange}
          autoWidth
          label="Workflow Type"
          name="workflowType"
        >
          {moveGermplasmTargets.map((target) => {
            return <MenuItem value={target.value}>{target.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  const SelectWorkflow = ({ workflows }) => {
    const [workflow, setWorkflow] = useState();

    const workflowChoices = workflows.map((workflow) => {
      return {
        value: workflow.id,
        label: workflow.name,
      };
    });

    const handleChange = (event) => {
      setWorkflow(event.target.value);
    };

    return (
      <FormControl sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="workflow-id">Workflow</InputLabel>
        <Select
          disabled={workflows.length === 0}
          labelId="workflow-id"
          id="workflow-id"
          value={workflow}
          onChange={handleChange}
          autoWidth
          label="Workflow Id"
          name="workflowId"
        >
          {workflowChoices.map((target) => {
            return <MenuItem value={target.value}>{target.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <FormDialog
      title="Move Germplasm"
      state={state.dialogState}
      sx={{
        display: "flex",
        width: "440px",
        height: "144px",
        padding: "16px",
        justifyContent: "center",
      }}
      open={open}
      onClose={onClose}
      addEvent={addEvent}
    />
  );
};

export { MoveGermplasmDialog };
