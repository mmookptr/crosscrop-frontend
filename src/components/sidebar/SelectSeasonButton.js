import { Box } from "@mui/system";
import { Button } from "@mui/material";

const SelectSeasonButton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "0 16px",
      }}
    >
      <Button
        sx={{
          width: "100%",
          borderRadius: 24,
          bgcolor: "background.menuButton",
          color: "black",
        }}
      >
        Year 2021 Season1
      </Button>
    </Box>
  );
};

export { SelectSeasonButton };
