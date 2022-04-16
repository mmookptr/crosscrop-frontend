import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const AddRecordToolbarButton = ({ sx, onClick }) => {
  return (
    <Button color="primary" sx={sx} startIcon={<AddIcon />} onClick={onClick}>
      Add record
    </Button>
  );
};

export { AddRecordToolbarButton };
