import { Link } from "react-router-dom";
import { useTheme } from "@mui/system";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Logo = () => {
  const theme = useTheme();

  return (
    <Box sx={{ textAlign: "center", margin: "48px 0 32px 0" }}>
      <Typography
        style={{
          background: theme.palette.background.sidebarTitle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
        variant="sidebarTitle"
        component={Link}
        to={"/"}
      >
        Cross Crop
      </Typography>
      <Typography>Let's Breed</Typography>
    </Box>
  );
};

export { Logo };
