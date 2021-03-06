import React from "react";
import { Routes, Route } from "react-router-dom";

import { Box } from "@mui/system";

import { ColdroomPage } from "../Page/ColdroomPage";
import { BreedingNurseryPage } from "../Page/BreedingNurseryPage";
import { CrossingBlockPage } from "../Page/CrossingBlockPage";
import { YieldTrialPage } from "../Page/YieldTrialPage";
import { Logout } from "@mui/icons-material";

const AppRoutes = () => {
  return (
    <Box sx={{ margin: 0, flex: "auto", padding: "32px" }}>
      <Routes>
        <Route path="/" element={<ColdroomPage />} />
        <Route path="/coldroom" element={<ColdroomPage />} />
        <Route path="/breedingnursery/:id" element={<BreedingNurseryPage />} />
        <Route path="/crossingblock/:id" element={<CrossingBlockPage />} />
        <Route path="/yieldtrial/:id" element={<YieldTrialPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
