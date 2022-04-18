import { React, useState } from "react";

import { Button } from "@mui/material";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { FormDialogState as State } from "./FormDialog/FormDialogState";
import { FormDialogEvent as Event } from "./FormDialog/FormDialogEvent";
import { FormDialog } from "./FormDialog/FormDialog";

import { MoveGermplasmTargetType } from "./MoveGermplasmTargetType";

const MoveGermplasmDialog = ({ open, onClose, addColumn }) => {
  const [state, setState] = useState({
    dialogState: new State.StartState(),
    selectedWorkflowType: MoveGermplasmTargetType.Coldroom,
    workflows: [],
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
    setState({
      ...state,
      dialogState: new State.LoadingState(),
    });

    const name = event.form.name;
    const type = event.form.type;

    addColumn(name, type);
  };

  const loadWorkflows = async (workflowType) => {
    // switch (workflowType) {
    //   case MoveGermplasmTargetType.Coldroom:
    //     break;
    //   case MoveGermplasmTargetType.BreedingNursery:
    // }
    // TODO: Implement this after season selection is implemented
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
                const type = form.workflowType.value;
                const germplasmIds = [];

                const moveGermplasmForm = {
                  germplasmIds: germplasmIds,
                  workflowId: type,
                };

                addEvent(new Event.FormSubmitEvent(moveGermplasmForm));
              }
            }}
          >
            Add
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
        value: workflow,
        label: workflow.name,
      };
    });

    const handleChange = (event) => {
      setWorkflow(event.target.value);
    };

    return (
      <FormControl sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="workflow-type">Workflow</InputLabel>
        <Select
          disabled={workflows.length === 0}
          labelId="workflow-type"
          id="workflow-type"
          value={workflow}
          onChange={handleChange}
          autoWidth
          label="Workflow Type"
          name="workflowType"
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
