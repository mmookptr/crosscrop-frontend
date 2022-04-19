import { React, useState } from "react";
import { useDispatch } from "react-redux";

import { Box, FormControl, Typography, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/system";

import cornImage from "../Image/corn.jpg";
import { getUsername, userLogin } from "../Slice/AuthenticationSlice";

const LoginPage = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const [username, setUsername] = useState();
  const handleUsername = (event) => {
    setUsername(event.target.value);
    dispatch(getUsername(username));
  };

  const [isLogin, setIsLogin] = useState();
  const handleLogin = () => {
    setIsLogin(true);
    dispatch(userLogin(isLogin));
  };

  const inputFontSize = { style: { fontSize: 20 } };

  return (
    <Box>
      <Box sx={{ left: 0, height: "100%", width: "60%", position: "fixed" }}>
        <img src={cornImage} height="100%" width="100%" />
      </Box>
      <Box
        sx={{
          right: 0,
          height: "100%",
          width: "40%",
          position: "fixed",
          paddingTop: "24px",
          background: "white",
          boxShadow: "10",
        }}
      >
        <Box sx={{ margin: "60px" }}>
          <Typography
            style={{
              background: theme.palette.background.sidebarTitle,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              textAlign: "center",
            }}
            variant="loginPanelHeader"
            display="block"
          >
            Crosscrop
          </Typography>
          <Typography
            align="center"
            variant="loginPanelSubheader"
            display="block"
          >
            Start Your Breeding Journey
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "80px",
            }}
          >
            <FormControl>
              <TextField
                label="Username"
                variant="standard"
                color="textInput"
                margin="dense"
                onChange={handleUsername}
                InputProps={inputFontSize}
                InputLabelProps={inputFontSize}
                sx={{ width: "280px" }}
              />
              <TextField
                label="Password"
                variant="standard"
                type="password"
                color="textInput"
                margin="dense"
                InputProps={inputFontSize}
                InputLabelProps={inputFontSize}
              />
              <Button
                variant="contained"
                sx={{
                  borderRadius: "24px",
                  margin: "auto",
                  marginTop: "40px",
                  bgcolor: "background.loginButton",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#f5a944" },
                  width: "70%",
                }}
                size="large"
                onClick={handleLogin}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "24px",
                  margin: "auto",
                  marginTop: "24px",
                  bgcolor: "background.registerButton",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#f5a944" },
                  width: "70%",
                }}
                size="large"
              >
                Register
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
