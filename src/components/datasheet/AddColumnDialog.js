import { React, useState } from "react";

import { Button } from "@mui/material";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { ColumnType } from "./ColumnType";

import { FormDialogState as State } from "../formDialog/FormDialogState";
import { FormDialogEvent as Event } from "../formDialog/FormDialogEvent";
import { FormDialog } from "../formDialog/FormDialog";

const AddColumnDialog = ({ open, onClose, addColumn }) => {
  const [state, setDialogState] = useState(new State.StartState());

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
    setDialogState(new State.LoadSuccessState(event.content));
  };

  const loadFailEventToState = (event) => {
    setDialogState(new State.LoadFailState(event.error));
  };

  const formSubmitEventToState = (event) => {
    setDialogState(new State.LoadingState());

    const name = event.form.name;
    const type = event.form.type;

    const onFail = (error) => {
      addEvent(new Event.LoadFailEvent(error));
    };

    addColumn(name, type, onFail);
  };

  const Content = () => {
    return (
      <form>
        <ColumnNameField />
        <SelectColumnType />

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
                const columnName = form.columnName.value;
                const columnType = form.columnType.value;

                addEvent(
                  new Event.FormSubmitEvent({
                    columnName: columnName,
                    columnType: columnType,
                  })
                );
              }
            }}
          >
            Add
          </Button>
        </Box>
      </form>
    );
  };

  const ColumnNameField = () => {
    return (
      <TextField
        sx={{ margin: "8px 0" }}
        placeholder="Column Name"
        required
        name="columnName"
        label="Column Name"
      />
    );
  };

  const SelectColumnType = () => {
    const columnTypes = [
      { value: ColumnType.String, label: ColumnType.String },
      { value: ColumnType.Number, label: ColumnType.Number },
      { value: ColumnType.Date, label: ColumnType.Date },
      { value: ColumnType.Datetime, label: ColumnType.Datetime },
      { value: ColumnType.Boolean, label: ColumnType.Boolean },
    ];

    const [type, setType] = useState(ColumnType.String);

    const handleChange = (event) => {
      setType(event.target.value);
    };

    return (
      <FormControl sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="column-type">Column Type</InputLabel>
        <Select
          labelId="column-type"
          id="column-type"
          value={type}
          onChange={handleChange}
          autoWidth
          label="Column Type"
          name="columnType"
        >
          {columnTypes.map((type) => {
            return <MenuItem value={type.value}>{type.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <FormDialog
      title="Add Column"
      state={state}
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

export { AddColumnDialog };
