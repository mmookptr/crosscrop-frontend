import React from "react";
import { Routes, Route } from "react-router-dom";

import { Box } from "@mui/system";

import { ColdroomPage } from "../pages/ColdroomPage";
import { BreedingNurseryPage } from "../pages/BreedingNurseryPage";
import { CrossingBlockPage } from "../pages/CrossingBlockPage";
import { YieldTrialPage } from "../pages/YieldTrialPage";

const AppRoutes = () => {
  return (
    <Box sx={{ margin: 0, flex: "auto", padding: "32px" }}>
      <Routes>
        <Route path="/" element={<ColdroomPage />} />
        <Route path="/coldroom" element={<ColdroomPage />} />
        <Route path="/breedingnursery/:id" element={<BreedingNurseryPage />} />
        <Route path="/crossingblock/:id" element={<CrossingBlockPage />} />
        <Route path="/yieldtrial/:id" element={<YieldTrialPage />} />
      </Routes>
    </Box>
  );
};

export default AppRoutes;
