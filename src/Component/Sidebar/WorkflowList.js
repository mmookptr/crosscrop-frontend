import { useLocation } from "react-router-dom";
import List from "@mui/material/List";

import MenuButton from "./MenuButton";

const WorkflowList = ({ presenters }) => {
  const location = useLocation().pathname;

  return (
    <List sx={{ flex: 1, overflow: "auto", padding: 0 }}>
      {presenters.map((presenter) => (
        <MenuButton
          presenter={presenter}
          key={presenter.buttonText}
          currentLocation={{ location }}
        />
      ))}
    </List>
  );
};

export { WorkflowList };
