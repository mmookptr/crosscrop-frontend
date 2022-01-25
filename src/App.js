import React from "react";

import { Box } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Router from "./Routes";

import "./App.css";

const theme = createTheme({
	palette: {
		background: {
			menuButton: "#ffffff",
			subItemButton: "#fff3f0",
			sidebar: "linear-gradient(90deg, #f4f2ea 0%, #f9eaed 100%)",
			sidebarTitle: "linear-gradient(270deg, #f4d60a 0%, #f54d75 100%"
		},
	},
	components: {
		MuiCollapse: {
			styleOverrides: {
				hidden: {
					display: "none",
				},
			},
		},
	},
	typography: {
		fontFamily: ["Nunito Sans"],
		pageTitle: {
			fontSize: "36px",
			fontWeight: "bold",
		},
		pageSubTitle: {
			fontSize: "24px",
			fontWeight: "bold",
			color: "#f54d75"
		},
		sidebarTitle: {
			fontSize: "40px",
			fontWeight: "bold",
			WebkitBackgroundClip: "text",
    	WebkitTextFillColor: "transparent"
		},
		sidebarSubTitle: {
			
		}
	},
});

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Box className="App">
				<Router />
			</Box>
		</ThemeProvider>
	);
}

export default App;
