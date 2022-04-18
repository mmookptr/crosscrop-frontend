import { React, useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@mui/material";
import { Box } from "@mui/system";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { FormDialogState as State } from "../FormDialog/FormDialogState";
import { FormDialogEvent as Event } from "../FormDialog/FormDialogEvent";
import { FormDialog } from "../FormDialog/FormDialog";

import { AppConfig } from "../../App/AppConfig";
import { SeasonRepository } from "../../Repository/SeasonRepository";

import { getSeason } from "../../Slice/SeasonSlice";

const SelectSeasonDialog = ({ open, onClose }) => {
  const [state, setState] = useState(new State.StartState());
  const repository = new SeasonRepository(AppConfig.BaseURL);

  const dispatch = useDispatch();

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
    setState(new State.LoadingState());

    loadSeason();
  };

  const loadSuccessEventToState = (event) => {
    setState(new State.LoadSuccessState(event.content));
  };

  const loadFailEventToState = (event) => {
    setState(new State.LoadFailState(event.error));
  };

  const formSubmitEventToState = (event) => {
    const season = event.form.season;
    dispatch(
      getSeason({
        id: season.id,
        year: season.year,
        seasonNo: season.seasonNo,
        name: season.name,
      })
    );
    onClose();
  };

  const loadSeason = async () => {
    const seasons = await repository.getSeasons();

    addEvent(new Event.LoadSuccessEvent(Content(seasons)));
  };

  const Content = (seasons) => () => {
    return (
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <SelectSeason seasons={seasons} />
          <Box
            sx={{
              display: "flex",
              width: "400px",
              flexDirection: "row",
              marginTop: "16px",
              justifyContent: "space-between",
            }}
          >
            <Button color="inherit" onClick={onClose}>
              Add Season
            </Button>
            <Box>
              <Button color="inherit" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                type="button"
                onClick={(event) => {
                  const form = event.target.form;

                  if (form.reportValidity()) {
                    const selectedSeason = seasons[form.season.value];

                    const selectSeasonForm = { season: selectedSeason };

                    addEvent(new Event.FormSubmitEvent(selectSeasonForm));
                  }
                }}
              >
                Select
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    );
  };

  const SelectSeason = ({ seasons }) => {
    const [selectedSeason, setSeason] = useState();

    const seasonChoices = seasons.map((season, index) => {
      return {
        value: index,
        label: season.name,
      };
    });

    const handleChange = (event) => {
      setSeason(event.target.value);
    };

    return (
      <FormControl sx={{ m: 1, width: "320px", alignSelf: "center" }}>
        <InputLabel id="season">Season</InputLabel>
        <Select
          disabled={seasons.length === 0}
          required={true}
          labelId="season"
          id="season"
          value={selectedSeason}
          onChange={handleChange}
          autoWidth
          label="Season"
          name="season"
        >
          {seasonChoices.map((season) => {
            return <MenuItem value={season.value}>{season.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <FormDialog
      title="Select Season"
      state={state}
      sx={{
        display: "flex",
        width: "400px",
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

export { SelectSeasonDialog };
