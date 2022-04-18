import { React, useState } from "react";

import { Button } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { FormDialogState as State } from "../FormDialog/FormDialogState";
import { FormDialogEvent as Event } from "../FormDialog/FormDialogEvent";
import { FormDialog } from "../FormDialog/FormDialog";
import { WorkflowType } from "../../Model/WorkflowType";

import { BreedingNurseryRepository } from "../../Repository/BreedingNurseryRepository";
import { CrossingBlockRepository } from "../../Repository/CrossingBlockRepository";
import { YieldTrialRepository } from "../../Repository/YieldTrialRepository";
import { AppConfig } from "../../App/AppConfig";

const AddWorkflowDialog = ({ open, onClose, seasonId }) => {
  const [state, setState] = useState({
    dialogState: new State.StartState(),
    selectedWorkflowType: WorkflowType.BreedingNursery,
  });

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
    const workflowName = event.form.workflowName;
    const workflowType = event.form.workflowType;

    addWorkflow(workflowName, workflowType, seasonId);

    setState({
      ...state,
      dialogState: new State.LoadingState(),
    });
  };

  const addWorkflow = async (name, type, seasonId) => {
    try {
      if (type === WorkflowType.BreedingNursery) {
        const repository = new BreedingNurseryRepository(AppConfig.BaseURL);

        await repository.createBreedingNursery(name, seasonId);
      } else if (type === WorkflowType.CrossingBlock) {
        const repository = new CrossingBlockRepository(AppConfig.BaseURL);

        await repository.createCrossingBlock(name, seasonId);
      } else if (type === WorkflowType.YieldTrial) {
        const repository = new YieldTrialRepository(AppConfig.BaseURL);

        await repository.createYieldTrial(name, seasonId);
      } else {
        throw new Error("add workflow invalid workflowType");
      }

      addEvent(new Event.StartEvent());

      onClose();
    } catch (error) {
      addEvent(new Event.LoadFailEvent(error));
    }
  };

  const Content = () => {
    return (
      <form>
        <WorkflowNameField />
        <SelectWorkflowType />
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
                const name = form.workflowName.value;
                const type = form.workflowType.value;

                const addWorkflow = {
                  workflowName: name,
                  workflowType: type,
                };

                addEvent(new Event.FormSubmitEvent(addWorkflow));
              }
            }}
          >
            Add
          </Button>
        </Box>
      </form>
    );
  };

  const WorkflowNameField = () => {
    return (
      <TextField
        sx={{ margin: "8px 0" }}
        placeholder="Name"
        required
        name="workflowName"
        label="Workflow name"
      />
    );
  };

  const SelectWorkflowType = () => {
    const workflowTypes = [
      {
        value: WorkflowType.BreedingNursery,
        label: WorkflowType.BreedingNursery,
      },
      {
        value: WorkflowType.CrossingBlock,
        label: WorkflowType.CrossingBlock,
      },
      {
        value: WorkflowType.YieldTrial,
        label: WorkflowType.YieldTrial,
      },
    ];

    const handleChange = (event) => {
      setState({ ...state, selectedWorkflowType: event.target.value });
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
          {workflowTypes.map((target) => {
            return <MenuItem value={target.value}>{target.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <FormDialog
      title="Add Workflow"
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

export { AddWorkflowDialog };
